import { BrowserRouter, Route, Routes } from "react-router-dom";

import BadgerBuds from "../BadgerBuds";
import BadgerBudsLanding from "./pages/BadgerBudsLanding"
import BadgerBudsAdoptable from "./pages/BadgerBudsAdoptable";
import BadgerBudsBasket from "./pages/BadgerBudsBasket";
import BadgerBudsNoMatch from "./pages/BadgerBudsNoMatch";

export default function BadgerBudsRouter() {
    return <BrowserRouter>
        <Routes>
            <Route path="/" element={<BadgerBuds />}>
                <Route index element={<BadgerBudsLanding />} />
                {/* TODO: Add your routes here! */}
                <Route path = "/available-cats" element = {<BadgerBudsAdoptable />}></Route>
                <Route path = "/basket" element = {<BadgerBudsBasket />}></Route>
                <Route path = "*" element = {<BadgerBudsNoMatch />}></Route>
            </Route>
        </Routes>
    </BrowserRouter>
}

//Route 的 element属性 中的内容，要使用import导入

/*
先定义 Route 的路由规则(也就是path)，再由 Nav.Link 改变路径触发 Route 的重新匹配和渲染。
严格意义上，Route 的规则始终存在，只是在 URL 改变后重新触发匹配，因此没有绝对的“先后顺序”，但从用户行为来看，确实有因果链条：“点击导航 -> 改变 URL -> 匹配路由 -> 渲染组件”。
*/

/*  https://stackblitz.com/edit/react-hbvgas?file=src%2FApp.js  下面是对这个网页的app.js的讲解 方便对Nav Router的理解 
//Nav用于到达某个路径，然后渲染插入的部分
//第一个Route作为父组件，当用户访问根路径/，Layout 组件被渲染，Home 组件作为默认页面加载到 Layout 的 <Outlet /> 中。
//父 Route 是一种布局组件（在本例中是 Layout），它可以定义导航栏、页脚等全局的 UI。
//<Outlet /> 是一个占位符，用于动态插入匹配的子 Route 的 element，即根据路径渲染不同的内容。
//子组件个人感觉就相当于是个if语句的封装，如果是某个路径，则渲染某个组件，然后插入到父组件所渲染的Layout组件中的<Outlet />中。以other-info为例，当Route检测到当前URL为other-info后，会渲染element的OtherInfo组件，并插入到Layout组件中的<Outlet /> 中
*/

/*
实际上，Route 是一个条件渲染工具，它会检测当前的 URL 是否匹配指定的 path：
如果匹配，就渲染对应的 element。
如果不匹配，则不渲染。
*/

/*
补充: 子 Route 是嵌套的，因此匹配成功后，渲染的子组件会插入到父组件的 <Outlet /> 中。
1.渲染时 都会渲染 父Route元素 也就是这里的 <Route path="/" element={<BadgerBuds />}> 也就是先到达BadgerBuds组件
2.然后 根据URL内容 渲染对应的元素 Outlet指代的是对应的元素

注意： / 路径匹配 index 路由
*/ 
