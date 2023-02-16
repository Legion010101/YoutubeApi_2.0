import React, {FC} from 'react'
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

export const SideBar: FC = () => {
  const navList = useSelector(getNavList)

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

  return (
    <Menu
      theme="dark"
      defaultSelectedKeys={['1']}
      mode="inline"
      items={items}
    />
  )
}
