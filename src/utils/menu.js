import {getRequest} from "@/utils/api";
import router from "@/router";

export const initMenu=(router,store)=>{
    if (store.state.routes.length > 0){
        return;
    }
    getRequest("/system/config/menu").then(data=>{
        if (data) {
            let fmtRoutes = formatRoutes(data);
            router.addRoutes(fmtRoutes);
            store.commit('initRoutes',fmtRoutes);
        }
    })
}

// 变量批量定义
export const formatRoutes=(routes)=>{
    let fmRoutes = [];
    routes.forEach(router=>{
        let {
            path,
            component,
            name,
            meta,
            iconCls,
            children
        }=router;

        // 判断是否有children并且children在数组之中,如果满足，则是一级菜单，返回递归之中去调用
        if (children && children instanceof Array){
            children=formatRoutes(children);
        }
        let fmRoute={
            path: path,
            name: name,
            iconCls: iconCls,
            meta: meta,
            children: children,
            // 动态加载component
            component(resolve){
                if (component.startsWith('Emp')){
                    require(['../views/emp/'+component+'.vue'],resolve);
                }else if (component.startsWith('Per')){
                    require(['../views/per/'+component+'.vue'],resolve);
                }else if (component.startsWith('sal')){
                    require(['../views/sal/'+component+'.vue'],resolve);
                }else if (component.startsWith('sta')){
                    require(['../views/sta/'+component+'.vue'],resolve);
                }else if (component.startsWith('sys')){
                    require(['../views/sys/'+component+'.vue'],resolve);
                }else {
                    require(['../views/'+component+'.vue'],resolve);
                }

            }
        }
        fmRoutes.push(fmRoute)
    })
    return fmRoutes;
}
