import React, { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  useParams,
  withRouter,
} from 'react-router-dom'
import { IoMdArrowDropright } from 'react-icons/io'
import { IoMdArrowDropleft } from 'react-icons/io'
import ProductPicture from '../product-picture'
import Card from './product-instrument-card'
import SideBar from '../product-sidebar'

function ProductList(props) {
  // const category = '鋼琴'
  const list = 'instrument'
  const control = props.control
  const setControl = props.setControl
  //分頁
  let pages = 0
  let pagesArr = []
  const { page } = useParams()
  pages = parseInt(page)
  const perPage = 20
  let num = 58
  let totalPage = Math.ceil(num / perPage)
  let idFirst = 0
  let idLast = 0
  if (pages == totalPage) {
    idFirst = perPage * (page - 1)
    idLast = num % perPage
  } else {
    idFirst = perPage * (page - 1)
    idLast = perPage
  }

  if (totalPage <= 5) {
    pagesArr.push(
      <a className="product-pages" href={`/instrument/page/${pages - 1}`}>
        <IoMdArrowDropleft className="product-pages-arrows" />
      </a>
    )
    for (let i = 1; i <= totalPage; i++) {
      pagesArr.push(
        <a className="product-pages" href={`/instrument/page/${i}`}>
          {i}
        </a>
      )
    }
    pagesArr.push(
      <a className="product-pages" href={`/instrument/page/${pages + 1}`}>
        <IoMdArrowDropright className="product-pages-arrows" />
      </a>
    )
  } else {
    pagesArr.push(
      <a className="product-pages" href={`/instrument/page/${pages - 1}`}>
        <IoMdArrowDropleft className="product-pages-arrows" />
      </a>
    )
    if (pages == 1 || pages == 2) {
      for (let i = 1; i <= 3; i++) {
        pagesArr.push(
          <a className="product-pages" href={`/instrument/page/${i}`}>
            {i}
          </a>
        )
      }
      pagesArr.push(<div className="product-pages">...</div>)
    } else if (pages == totalPage || pages == totalPage - 1) {
      pagesArr.push(<div className="product-pages">...</div>)
      for (let i = totalPage - 2; i <= totalPage; i++) {
        pagesArr.push(
          <a className="product-pages" href={`/instrument/page/${i}`}>
            {i}
          </a>
        )
      }
    } else {
      pagesArr.push(<div className="product-pages">...</div>)
      for (let i = pages - 1; i <= pages + 1; i++) {
        pagesArr.push(
          <a className="product-pages" href={`/instrument/page/${i}`}>
            {i}
          </a>
        )
      }
      pagesArr.push(<div className="product-pages">...</div>)
    }
    pagesArr.push(
      <a className="product-pages" href={`/instrument/page/${pages + 1}`}>
        <IoMdArrowDropright className="product-pages-arrows" />
      </a>
    )
  }

  const [dataP, setDataP] = useState([])
  const [favArr, setFavArr] = useState([])

  async function getDataP() {
    fetch(`http://localhost:3030/product/getlist`, {
      method: 'POST',
      body: JSON.stringify({ control, idFirst, idLast, list }),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        setDataP(json)
      })
  }
  async function getInstrumentFav() {
    fetch(`http://localhost:3030/product/instrument/favorite`, {
      method: 'POST',
      body: JSON.stringify(),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        const mm = json.map((a) => a.FavPId)
        setFavArr(mm)
      })
  }

  useEffect(() => {
    getInstrumentFav()
    getDataP()
  }, [])
  useEffect(() => {
    // console.log(control)
    setDataP([])
    getDataP()
  }, [control])

  return (
    <>
      <SideBar productTitleId={props.productTitleId} />
      <div className="product-container">
        <ProductPicture
          productTitle={props.productTitle}
          productTitleId={props.productTitleId}
        />
        <div className="product-wrapper">
          <div className="product-control">
            <span>排序依</span>
            <select
              onChange={(e) => {
                // console.log('control change', e.target.value)
                setControl(e.target.value)
              }}
            >
              <option
                value="熱門度"
                selected={`${control == '熱門度' ? 'selected' : ''}`}
              >
                熱門度
              </option>
              <option
                value="價格高到低"
                selected={`${control == '價格高到低' ? 'selected' : ''}`}
              >
                價格高到低
              </option>
              <option
                value="價格低到高"
                selected={`${control == '價格低到高' ? 'selected' : ''}`}
              >
                價格低到高
              </option>
            </select>
          </div>
          <div className="product-card-list">
            {dataP.map((c, index) => {
              return (
                <>
                  <Card
                    PName={c.PName}
                    PPrice={c.PPrice.toString().replace(
                      /(\d)(?=(\d{3})+(\d{3})?$)/g,
                      '$1,'
                    )}
                    favArr={favArr}
                    setFavArr={setFavArr}
                    PImg={c.PImg}
                    PId={c.PId}
                  />
                </>
              )
            })}
          </div>

          <div id="product-pages-list">{pagesArr.map((a) => a)} </div>
        </div>
      </div>
    </>
  )
}

export default withRouter(ProductList)
