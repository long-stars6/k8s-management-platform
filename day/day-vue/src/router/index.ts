import Deployment from '@/pages/deployment.vue';
import { createRouter, createWebHistory } from 'vue-router';
import Pods from '@/pages/Pods.vue';
import Sidebar from '@/pages/saidebar.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
        name: "cluster",
        path: "/cluster",
        component: () => import('@/pages/Cluster.vue')
    },{
      name: "deployment",
      path: "/deployment",
      component: () => import('@/pages/deployment.vue')
    },{
      name: "pods",
      path: "/pods",
      component: () => import('@/pages/Pods.vue')
    },{
      name: "sidebar",
      path: "/sidebar",
      component: () => import('@/pages/saidebar.vue')
    },
    {
      name: "cicd",
      path: "/cicd",
      component: () => import('@/pages/Cicd.vue')
    },
    {
      name: "volumes",
      path: "/volumes",
      component: () => import('@/pages/volumes.vue')
    },
    {
      name: "alert",
      path: "/alert",
      component: () => import('@/pages/alert.vue')
    },
    {
      path: '/logs/:podName/:namespace',
      name: 'logs',
      component: () => import('@/pages/logs.vue'),
      props: true,
    },
    {
      path: '/pod-detail/:podName/:namespace/:containerName',
      name: 'pod-detail',
      component: () => import('@/pages/PodDetail.vue'),
      props: true,
    },
    {
      name: "services",
      path: "/services",
      component: () => import('@/pages/Services.vue')
    },
    {
      name: "alert",
      path: "/alert",
      component: () => import('@/pages/alert.vue')
    },
    {
      name: "terminal",
      path: "/terminal/:podName/:namespace/:containerName",
      component: () => import('@/pages/terminal.vue')
    },    
  ]
})

export {router};