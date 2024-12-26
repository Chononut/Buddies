import React, {useContext, useState, useEffect} from "react";
import BadgerBudsDataContext from "../../../contexts/BadgerBudsDataContext";
import { Col, Container, Form, Row, Pagination, Button } from "react-bootstrap";
import BadgerBudSummary from "./BadgerBudSummary";

export default function BadgerBudsAdoptable(props) {
    const buds = useContext(BadgerBudsDataContext)
    //搜索功能
    const [genderSearch, setGenderSearch] = useState("")
    const [colorSearch, setColorSearch] = useState("")
    const [searchedCats, setSearchedCats] = useState(buds || [])
    const [isLoading, setIsLoading] = useState(true); // 加载状态 和14行 90行配套使用 因为buds是网络请求获取的数据 用户未加载完成时 可能会看到空白页

    /*只是为了改变isLoading的状态 和90行匹配 在获取buds时 提醒用户还在加载*/
    useEffect(() => {
        if (buds.length > 0) {
            setSearchedCats(buds);
            setIsLoading(false); // 数据加载完成
        }
    }, [buds]);

    useEffect(() => {
        const handleSearch = () => {
            let inputGender = genderSearch.toLowerCase().trim()
            let inputColor = colorSearch.toLowerCase().trim()
    
            const afterSearch = buds.filter(unsavedCat => {
                return (!inputGender || (unsavedCat.gender.toLowerCase() === inputGender)) &&
                (!inputColor || (unsavedCat.colors.some(color => color.toLowerCase() === inputColor)))
            })
            setSearchedCats(afterSearch)
            console.log("after search:", afterSearch)
            setPage(1)
        }
        handleSearch()
    }, [genderSearch, colorSearch, buds])
    //buds 是从API异步获取的数据 所以要注意其变化 后续如果API中的buds数据有更新 依赖项中有buds也无需更改
    //搜索功能结束

    //分页功能
    const [page, setPage] = useState(1)

    const buildPagination = () => {
        const items = []
        const pageNumber = Math.ceil(unSavedCats.length / 8)
        for (let i = 1; i <= pageNumber; i++){
            items.push(
                <Pagination.Item key={i} active={page === i} onClick={() => setPage(i)}>
                    {i}
                </Pagination.Item>
            )
        }

        //在数组开头添加元素
        items.unshift(<Pagination.Prev key="prev" onClick = {() => setPage(page - 1)} disabled = {page === 1 || unSavedCats.length === 0}/>)
        //在数组结尾添加元素
        items.push(<Pagination.Next key="next" onClick = {() => setPage(page + 1)} disabled = {page === pageNumber || unSavedCats.length === 0}/>)
        return items
    }
    // 分页功能结束

    //const buds = useContext(BadgerBudsDataContext)
    //对每个组件使用会话存储
    const [savedCatsIds, setSavedCatsIds] = useState(JSON.parse(sessionStorage.getItem('savedCatsIds') || "[]"))
    /*useContext本身不是异步的，取决于Provider给context的值，在BadgerBuds组件中，value为buds，buds是通过setState控制状态的
    所以这里的buds是异步加载数据的，然后下面的useState的初始化值就可能为空（或未定义），会导致第一次渲染时错误
    const [cats, setCats] = useState(buds)
    所以确保buds数据一家在后再初始化状态，如下
    const [cats, setCats] = useState(buds || [])
    使用 useEffect 监听 buds 的变化，在 buds 数据加载完成后更新 cats*/
    const adoptedCatsIds = JSON.parse((sessionStorage.getItem('adoptedCatsIds')) || "[]")
    console.log("check after search", searchedCats.map(searchedCat => searchedCat.name))
    const unSavedCats = searchedCats.filter(bud => {
        return !savedCatsIds.includes(bud.id) && 
        !adoptedCatsIds.includes(bud.id)})
    console.log("unSavedCats",unSavedCats)

    useEffect(() => {
        //如果点击save 就将这个cat储存到会话储存中 setState函数是异步执行，无法立即更新状态，sessionStorage是立即储存的，如果混用会导致数据的非同步性。如果非要混用，可借助useEffect保持状态与React同步
        //sessionStorage.setItem('saved_Cat', catName)， 这样做只能储存一个cat,所以要使用数组
        sessionStorage.setItem('savedCatsIds', JSON.stringify(savedCatsIds))
    }, [savedCatsIds])

    //函数用以改变状态 重新渲染页面
    const saveCat = (catId, catName) => {
        const newSavedCats = [...savedCatsIds, catId]
        setSavedCatsIds(newSavedCats)
        alert(`${catName} has been added to your basket!`)
    }

    //这样的条件渲染语句 要么写在用于渲染的return上方而且要相邻 要么写在return里面
    // 如果数据正在加载，显示加载状态
    if (isLoading) {
        return <p>Loading available Badger Buds...</p>;
    }
    
    return <div>
        <h1>Available Badger Buds</h1>
        <p>The following cats are looking for a loving home! Could you help?</p>
        <Form>
            <Form.Label htmlFor="searchGender">Gender</Form.Label>
            <Form.Control id="searchGender" value={genderSearch} onChange={e => setGenderSearch(e.target.value)}></Form.Control>
            <Form.Label htmlFor="searchColor">Color</Form.Label>
            <Form.Control id="searchColor" value={colorSearch} onChange={e => setColorSearch(e.target.value)}></Form.Control>
        </Form>
        <Button onClick={() => {setColorSearch(""); setGenderSearch(""); setSearchedCats(buds)}}>Reset Search</Button>
        {unSavedCats.length === 0 ? (
            <p>No buds are available for adoption!</p>
        ) : (
            <Container>
                <Row>
                    {
                        unSavedCats.slice(8 * (page - 1), 8 * page).map(unSavedCat => {
                            return <Col key = {unSavedCat.id} sm={6} md = {4} lg ={3}>
                                {/* 中括号中的cat是遍历每一个cats数组得到的，中括号代表执行jsx而不是对象。这里是将某一个cat传递给前面的cat属性，然后回到上面的BadgerBudsSummary函数组件，形参中的{}将传入的cat转化为对象数据类型 */}
                                <BadgerBudSummary cat = {unSavedCat} save = {saveCat}/>
                            </Col>
                        })
                    }
                </Row>
            </Container>
        )}

        <Pagination>
            {buildPagination()}
        </Pagination>
    </div>
}

/* 第10行，注意返回语句写法，观察网页，图片，名字还有按钮是一个整体，使用div */
/* 第15行，如何在动态在src中加入动态的URL ：使用反引号${}*/
/* 第16行，为图片添加样式，确保图片填满列的宽度，同时保持纵横比。但这么做以后，依旧因图片大小不一让网页难看 */
/*  注意响应式显示，要从react-bootstrap中导入Container，Row，Col。 同时Col应在数组方法中的div前面使用，这样才能将数组中的每个元素和Col结合起来*/
/* 展示更多内容，就需要react重新渲染组件 */

/* 
一开始想的是，使用useEffect钩子，看按钮名称是否改变，如果改变了执行展示更多信息的函数，但是在添加信息中遇到了麻烦
export default function BadgerBudsAdoptable(props) {

    const cats = useContext(BadgerBudsDataContext) 

    const BadgerBudSummary = () => {
        //useState返回的是一个cats数组，如果是useState([cats])，此处将其包裹在额外的数组中，导致 expanded 成为嵌套数组（如 [[expanded1, expanded2, ...]]）
        const [expanded, setExpanded] = useState(cats)

        const [buttonContext, setButtonContext] = useState("Show more")

        const push = () => {
            setButtonContext("Show less")
        }

        useEffect(() => {
            const showMore = () => {
                return (
                    cats.map(cat => 
                        <div key = {cat.id}>
                            <p>{cat.gender}</p>
                            <br />
                            <p>{cat.breed}</p>
                            <br />
                            <p>{cat.age}</p>
                            <br />
                            <p>{() => {
                                if (cat.description === null){
                                    return
                                }
                                return cat.description
                            }}</p>
                        </div>
                    )
                )
        }}, [buttonContext])*/

/*
后来直接设置按钮状态，以控制是否展示更多信息，但这样按一个按钮后，所有单个组件都会展示更多信息。
缺点：所有变量都嵌套在一个状态，组件不独立，修改调整麻烦，添加额外交互功能需要更改大量代码（状态作用域大，不容易扩展）
export default function BadgerBudsAdoptable(props) {
    const cats = useContext(BadgerBudsDataContext)

    //能给下面在组件中自定义的组件添加props参数吗
    const BadgerBudSummary = () => {

        const [showMore, setShowMore] = useState(false)

        return (
            cats.map(cat => 
                <Col key = {cat.id} xs = {6} md = {4} lg = {3} xxl = {2}>
                    <div>
                        <img 
                            alt = {"A picture of " + cat.name} 
                            src = {`https://raw.githubusercontent.com/CS571-S24/hw5-api-static-content/main/cats/${cat.imgIds[0]}`} 
                            style = {{ width: "100%", height: "auto"}}></img>
                        <p><b>{cat.name}</b></p>
                        {showMore? 
                            <div>
                                <p>{cat.gender}</p>
                                <p>{cat.breed}</p>
                                <p>{cat.age}</p>
                                <p>{cat.description?cat.description:null}</p>
                             </div>:null}
                        <Button variant = "primary" onClick={() => setShowMore(!showMore)}>{showMore? "Show less" : "Show more  "}</Button>
                        <Button variant = "secondary">save</Button>
                    </div>
                </Col>
            )
        )
    }

    return <div>
        <h1>Available Badger Buds</h1>
        <p>The following cats are looking for a loving home! Could you help?</p>
        <Container>
            <Row>
                {
                    <BadgerBudSummary />
                }
            </Row>
        </Container>
    </div>
} */
/*
步骤五就相当于改变组件的整体状态 */

/*
原先第五步的代码
export default function BadgerBudsAdoptable(props) {
    const cats = useContext(BadgerBudsDataContext)
    
    const transfer = () => {
        
    }

    //能给下面在组件中自定义的组件添加props参数吗
    //注意参数的数据类型，{}表示对象
    //BadgerBudsSummary用以实现展示每只猫的组件
    const BadgerBudSummary = ({cat, transferCat}) => {
        //设置按钮状态
        const [showMore, setShowMore] = useState(false)

        //设置save猫的状态
        const [favCat, setFavCat] = useState(savedCat ? savedCat : '')
        const savedCat = sessionStorage.getItem("saved_Cat")

        //设置被点击save的猫
        const saveCat = () => {
            setFavCat(cat)
            sessionStorage.setItem('saved_Cat', favCat)
            //转换猫的位置
            props.transferCat(savedCat)
        }

        return (
                <div>
                    <img 
                        alt = {"A picture of " + cat.name} 
                        src = {`https://raw.githubusercontent.com/CS571-S24/hw5-api-static-content/main/cats/${cat.imgIds[0]}`} 
                        style = {{ width: "100%", height: "auto"}}></img>
                    <p><b>{cat.name}</b></p>
                    {showMore? 
                        <div>
                            <p>{cat.gender}</p>
                            <p>{cat.breed}</p>
                            <p>{cat.age}</p>
                            <p style = {{fontSize:"0.5em"}}>{cat.description?cat.description:null}</p>
                        </div>:null}
                    <Button variant = "primary" onClick={() => setShowMore(!showMore)}>{showMore? "Show less" : "Show more  "}</Button>
                    <Button variant = "secondary" onClick={() => saveCat()}>save</Button>
                </div>
        )
    }

    return <div>
        <h1>Available Badger Buds</h1>
        <p>The following cats are looking for a loving home! Could you help?</p>
        <Container>
            <Row>
                {
                    cats.map(cat => {
                        return <Col key = {cat.id} xs = {6} md = {4} lg ={3} xxl ={2}>
                            /* 中括号中的cat是遍历每一个cats数组得到的，中括号代表执行jsx而不是对象。这里是将某一个cat传递给前面的cat属性，然后回到上面的BadgerBudsSummary函数组件，形参中的{}将传入的cat转化为对象数据类型 */
                        /*  <BadgerBudSummary cat = {cat} transferCat = {transfer}/>
                        </Col>
                    })
                }
            </Row>
        </Container>
    </div>
}
*/

/*
下段代码所得
1.filter接收true和false，保留true的数组
2.父组件传递给子组件的回调函数，在子组件调用时，只会执行词回调函数，不会执行父组件其他的任何内容
3.解构赋值
import React, {useContext} from "react";
import BadgerBudsDataContext from "../../../contexts/BadgerBudsDataContext";
import { Col, Container, Row } from "react-bootstrap";
import BadgerBudSummary from "./BadgerBudSummary";

export default function BadgerBudsAdoptable(props) {
    const cats = useContext(BadgerBudsDataContext)

    //目的是过滤点击项，但子组件只会执行传递过去的回调函数
    const transfered_Cats = cats.filter((cat) => {
        cat.id === sessionStorage.getItem("saved_Cat")
    })

    const transferCat = () => {
        alert(sessionStorage.getItem("saved_Cat") + " has been added to your basket!")
    }

    return <div>
        <h1>Available Badger Buds</h1>
        <p>The following cats are looking for a loving home! Could you help?</p>
        <Container>
            <Row>
                {
                    transfered_Cats.map(cat => {
                        return <Col key = {cat.id} xs = {6} md = {4} lg ={3} xxl ={2}>
                            <BadgerBudSummary cat = {cat} transfer = {transferCat}/>
                        </Col>
                    })
                }
            </Row>
        </Container>
    </div>
}


子组件
import React, { useState } from "react";
import {Button} from "react-bootstrap";

//注意参数的数据类型，{}表示对象
//BadgerBudsSummary用以实现展示每只猫的组件
const BadgerBudSummary = ({cat, transfer}) => {
    //设置按钮状态
    const [showMore, setShowMore] = useState(false)

    //没用到下面这个变量
    const transferedCat = sessionStorage.getItem("saved_Cat")
    const [savedCat, setSavedCat] = useState([])

    const handleTransfer = () => {
        //如果点击save 就将这个cat设为savedCat 同时储存到会话储存中
        setSavedCat(cat)
        sessionStorage.setItem('saved_Cat', savedCat.id)
        //已经解构赋值了，应是transfer()
        props.transferCat()
    } 

    return (
            <div>
                <img 
                    alt = {"A picture of " + cat.name} 
                    src = {`https://raw.githubusercontent.com/CS571-S24/hw5-api-static-content/main/cats/${cat.imgIds[0]}`} 
                    style = {{ width: "100%", height: "auto"}}></img>
                <p><b>{cat.name}</b></p>
                {showMore? 
                    <div>
                        <p>{cat.gender}</p>
                        <p>{cat.breed}</p>
                        <p>{cat.age}</p>
                        <p style = {{fontSize:"0.5em"}}>{cat.description?cat.description:null}</p>
                    </div>:null}
                <Button variant = "primary" onClick={() => setShowMore(!showMore)}>{showMore? "Show less" : "Show more  "}</Button>
                <Button variant = "secondary" onClick={() => handleTransfer()}>save</Button>
            </div>
    )
}

export default BadgerBudSummary;*/