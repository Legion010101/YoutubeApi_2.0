import React, {FC, useEffect, useState} from 'react'
import {MenuItem} from '../../App'
import {NavLink} from 'react-router-dom'
import {Menu} from 'antd'
import {useSelector} from 'react-redux'
import {HeartOutlined, SearchOutlined} from '@ant-design/icons'
import {getNavList} from '../../redux/reduxSelectors/searchPageSelector'

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem
}

export const SideBar: FC<PropsType> = ({location}) => {
  const navList = useSelector(getNavList)
  const [activeKey, setActiveKey] = useState('1')
  useEffect(() => {
    switch (location) {
      case '/YoutubeApi_2.0/search': {
        setActiveKey('1')
        break
      }
      case '/YoutubeApi_2.0/featuredQueries': {
        setActiveKey('2')
        break
      }
    }
  }, [location])

  const items = navList.map((link) => {
    let icon
    switch (link.text) {
      case 'Избранное': {
        icon = <HeartOutlined />
        break
      }
      case 'Поиск': {
        icon = <SearchOutlined />
        break
      }
    }

    return getItem(<NavLink to={link.to}>{link.text}</NavLink>, link.key, icon)
  })
  // useLocation -> pathname
  // useEffect item.link === pathname
  // setState index
  return (
    <Menu
      theme="dark"
      defaultSelectedKeys={['1']}
      mode="inline"
      items={items}
      selectedKeys={[activeKey]}
    />
  )
}
type PropsType = {
  location: string
}
