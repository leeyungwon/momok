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
        const newEgg = userInfo.egg + 1;
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
  async getRestaurant(idx,restaurantIdx){
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
          where += " and spicy = ?";
          params.push(userInfo.spicy);
        }
        const newEgg = userInfo.egg - 1;
        await this.updateUserEgg(idx,newEgg);
        const sql = `select r.idx,r.name,r.type,r.popular_menu ,r.address  from restaurant r where 1=1 ${where}`;
        const [rows,fields] = await pool.query(sql,params);
        let randomVal = null;
        if(restaurantIdx != 0 && userInfo.continuity == 0){
          randomVal = rows[Math.floor(Math.random() * rows.length)];
        }else{
          while (true) {
            randomVal = rows[Math.floor(Math.random() * rows.length)];
            if(randomVal.idx != restaurantIdx){
              break;
            }
          }
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
   * 푸드 카드 조회
   * @param {*} userIdx 
   * @returns 
   */
  async getFoodCard(userIdx){
    let res = {
      errMsg : "",
      success : true,
      result:{
        list:[],
        userList:[]
      },
      status : 200
    }
    try{
      const sql =`select r.idx , r.name ,r.user_idx as userIdx ,DATE_FORMAT(r.create_date,'%Y-%m-%d') as create_date ,IFNULL(round(AVG(rg.grade),1),0) as grade from restaurant r 
      left join restaurant_grade rg on rg.restaurant_idx = r.idx 
      group by r.idx`;
      const [rows,fields] = await pool.query(sql,[]);
      res.result.list = rows;
      res.result.userList = rows.filter(item => item.userIdx == userIdx);
    }catch(err){
      res.errMsg = err;
      res.success = false;
      res.status = 400;
    }
    return res;
  }
}