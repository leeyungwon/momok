import {
  useState,
} from 'react'
import _ from 'lodash'

import {
  FormWrap,
  Label,
  Input,
  Select,
  Button,
} from '~/styles/restaurant/add/form'

const Form = ({
  title,
  name,
  type,
  options,
  dataValue,
  onHandleChangeData,
  handleModal,
}) => {
  const [
    value,
    setValue,
  ] = useState('')

  const handleChange = e => {
    const value = e.target.value

    setValue(value)
    onHandleChangeData(name, value)
  }

  const handleClickAddressBtn = () => {
    navigator.permissions.query({
      name: 'geolocation',
    })
    .then(result => {
      if (result.state === 'denied') {
        alert('위치 정보 사용을 허용하면 현재 위치 기준으로 검색 가능합니다.\n위치 정보 사용이 거부되어 회사 위치 기준으로 검색합니다.')
      }
      if (result.state === 'prompt') {
        navigator.geolocation.getCurrentPosition(() => {})
      }
      if (result.state !== 'prompt') {
        handleModal(true)
      }

      result.addEventListener('change', () => {
        if (result.state === 'denied') {
          alert('위치 정보 사용을 허용하면 현재 위치 기준으로 검색 가능합니다.\n위치 정보 사용이 거부되어 회사 위치 기준으로 검색합니다.')
        }

        handleModal(true)
      })
    })
  }

  return (
    <FormWrap>
      <Label htmlFor={name}>{title}</Label>
      {type === 'input' &&
        <Input
          name={name}
          id={name}
          value={value}
          onChange={handleChange}
        />
      }
      {type === 'select' &&
        <Select
          name={name}
          id={name}
          value={value}
          onChange={handleChange}
        >
          <option hidden></option>
          {_.map(options, option => (
            <option
              key={option}
              value={option}
            >{option}</option>
          ))}
        </Select>
      }
      {type === 'address' &&
        <Button
          name={name}
          id={name}
          onClick={handleClickAddressBtn}
        >
          {dataValue.id ? dataValue.road_address_name : '주소 찾기'}
        </Button>
      }
    </FormWrap>
  )
}

export default Form
