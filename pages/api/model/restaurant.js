import { pool } from "../config/db";
import { Auth } from "./auth";

export class Restaurant{
  constructor(){}


  /**
   * 식당 등록
   * @param {*} params 
   * @param {*} idx 
   * @returns 
   */
  async addRestaurant(payload,idx){
    let res = {
      status : 200,
      success : true,
      insertId:0,
      errMsg : ""
    }
    try{
      const auth = new Auth();
      const params = [
        payload.name,
        payload.type,
        payload.popularMenu,
        payload.address,
        payload.spicy,
        payload.lat,
        payload.lng,
        payload.palceId,
        idx
      ]
      const sql = `INSERT INTO momok.restaurant
      (name, type, popular_menu, address, spicy,lat,lng,palce_id,user_idx)
      VALUES(?,?, ?, ?, ?, ?,?,?,?);`
      const result = await pool.query(sql,params);
      if(!result[0].insertId){
        res.errMsg = "식당 등록 실패";
        res.success = false;
      }else{
        res.insertId = result[0].insertId;
        const userInfo = await (await auth.findUser(idx)).result
        const rand = this.getRandomInt(1,6);
        const newEgg = userInfo.egg + rand;
        await this.updateUserEgg(idx,newEgg);
      }
    }catch(err){
      res.status = 400;
      res.success = false;
      res.errMsg = err;
    }
    return res;
  }

  /**
   * 에그 업데이트
   * @param {*} idx 
   * @param {*} egg 
   * @returns 
   */
  async updateUserEgg(idx,egg){
    let res = {
      errMsg : "",
      success : true,
      status : 200
    }
    try{
      const sql = `update users set egg = ? where idx = ?`;
      const result = await pool.query(sql,[egg,idx]);
      if(!result){
        res.success = false;
      }
    }catch(err){
      res.errMsg = err;
      res.success = false;
      res.status = 400;
    }
    return res;
  }


  /**
   * 식당 조회
   * @param {*} idx 
   * @param {*} restaurantIdx 
   * @returns 
   */
  async getRestaurant(idx,restaurantIdx,lat,lng){
    let res = {
      errMsg : "",
      success : true,
      result:{},
      status : 200
    }
    try{
      const auth = new Auth();
      const userInfo = await (await auth.findUser(idx)).result
      if(userInfo.egg == 0){
        res.errMsg = "달걀을 모두 사용하였습니다.";
        res.success = false;
      }else{
        let where = "";
        let params = [];
        if(userInfo.spicy != null){
          where += " and spicy <= ?";
          params.push(userInfo.spicy);
        }
        const newEgg = userInfo.egg - 1;
        await this.updateUserEgg(idx,newEgg);
        const sql = `select r.idx,r.name,r.type,r.popular_menu ,r.address,r.lat,r.lng,IFNULL(ROUND(AVG(rg.grade),2),0) as grade 
        from restaurant r 
        left join restaurant_grade rg on rg.restaurant_idx = r.idx 
        where 1=1 ${where} group by r.idx`;
        const [rows,fields] = await pool.query(sql,params);

        let nearness =[]
        let little = []
        let veryFar = []
        for(let item of rows){
          const distance = this.getDistance(lat,lng,item.lat,item.lng)
          const newItem = {...item}
          if(distance <= 100){
            newItem.distance = '가까움'
            nearness.push(newItem);
          }else if(distance > 100 && distance <= 200){
            newItem.distance = '조금먼'
            little.push(newItem);
          }else{
            newItem.distance = '매우먼'
            veryFar.push(newItem)
          }
        }
        const target = nearness.length == 0 ? little.length == 0 ? veryFar : little : nearness
        let randomVal = null;
        if(restaurantIdx != 0 && userInfo.continuity == 0){
          randomVal = target[Math.floor(Math.random() * target.length)];
        }else{
          while (true) {
            randomVal = target[Math.floor(Math.random() * target.length)];
            if(randomVal.idx != restaurantIdx){
              break;
            }
          }
        }
        const duplicate = await this.duplicateCardCheck(idx,randomVal.idx);
        if(!duplicate.isDupliate){
          await this.addFoodCard(idx,randomVal.idx)
        }
        res.result = randomVal;
      }
    }catch(err){
      res.errMsg = err;
      res.success = false;
      res.status = 400;
    }
    return res;
  }

  /**
   * 음식 카드 등록
   * @param {*} userIdx 
   * @param {*} restaurantIdx 
   */
  async addFoodCard(userIdx,restaurantIdx){
    let res = {
      success : true,
      errMsg : ""
    }
    try{
      const sql = `INSERT INTO momok.food_card (user_idx, restaurant_idx) VALUES(?, ?);`;
      const result = await pool.query(sql,[userIdx,restaurantIdx]);
      if(!result[0].insertId){
        res.errMsg = "카드 등록 실패";
        res.success = false;
      }else{
        res.insertId = result[0].insertId;
      }
    }catch(err){
      res.errMsg = err;
    }
    return res;
  }


  /**
   * 음식 카드 중복 검사
   * @param {*} phone 
   * @returns 
   */
   async duplicateCardCheck(idx,restaurantIdx){
    let res = {
      errMsg : "",
      success : true,
      isDupliate:false,
    }
    try{
      const sql = `select count(*) as cnt from food_card fc where fc.user_idx = ? and restaurant_idx = ?;`;
      const [rows,fields] = await pool.query(sql,[idx,restaurantIdx]);
      // console.log(rows);
      if(rows.length){
        if(rows[0].cnt > 0){
          res.isDupliate = true;
        }
      }
    }catch(err){
      res.errMsg = err;
      res.success = false;
      res.status = 400;
    }
    return res;

  }


  /**
   * 푸드 카드 조회
   * @param {*} userIdx 
   * @returns 
   */
  async getFoodCard(userIdx){
    let res = {
      errMsg : "",
      success : true,
      result:{
        foodCard:[],
        addList:[]
      },
      status : 200
    }
    try{
      const sql =`select fc.idx,fc.restaurant_idx ,r.name ,r.type ,r.popular_menu as popularMen ,r.address ,r.spicy,IFNULL(ROUND(AVG(rg.grade),2),0) as grade ,DATE_FORMAT(r.create_date,'%Y-%m-%d') as createDate from food_card fc 
      left join restaurant r on r.idx = fc.restaurant_idx 
      left join restaurant_grade rg on r.idx = rg.restaurant_idx 
      where fc.user_idx = ? group by r.idx`;
      const [rows,fields] = await pool.query(sql,[userIdx]);
      res.result.foodCard = rows;
      res.result.addList = await this.getAddRestaurantList(userIdx);

      // res.result.userList = rows.filter(item => item.userIdx == userIdx);
    }catch(err){
      res.errMsg = err;
      res.success = false;
      res.status = 400;
    }
    return res;
  }

  /**
   * 유저가 등록한 식당 조회
   * @param {*} userIdx 
   * @returns 
   */
  async getAddRestaurantList(userIdx){
    let res = {
      errMsg : "",
      list : [],
      success : true
    }
    try{
      const sql = `select r.name ,r.type ,r.popular_menu as popularMenu  ,r.address ,r.spicy,IFNULL(ROUND(AVG(rg.grade),2),0) as grade,DATE_FORMAT(r.create_date,'%Y-%m-%d') as createDate from restaurant r 
      left join restaurant_grade rg on r.idx = rg.restaurant_idx 
      where r.user_idx = ? group by r.idx`
      const [rows,fields] = await pool.query(sql,[userIdx]);
      res.list = rows;
    }catch(err){
      res.errMsg = err;
      res.success = false;
    }
    return res;
  }


  //랜덤 숫자 생성
  getRandomInt(min,max){
    return Math.floor(Math.random() * (max - min)) + min;
  }

  //거리 구하기
  getDistance(lat1, lon1, lat2, lon2) {
    if ((lat1 == lat2) && (lon1 == lon2))
        return 0;

    var radLat1 = Math.PI * lat1 / 180;
    var radLat2 = Math.PI * lat2 / 180;
    var theta = lon1 - lon2;
    var radTheta = Math.PI * theta / 180;
    var dist = Math.sin(radLat1) * Math.sin(radLat2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.cos(radTheta);
    if (dist > 1)
        dist = 1;

    dist = Math.acos(dist);
    dist = dist * 180 / Math.PI;
    dist = dist * 60 * 1.1515 * 1.609344 * 1000;
    if (dist < 100) dist = Math.round(dist / 10) * 10;
    else dist = Math.round(dist / 100) * 100;

    return dist;
  }
}