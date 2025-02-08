<script setup>
import Menubar from 'primevue/menubar';
import { useRouter} from 'vue-router';
import router from './router'; //utilizando a router do vue

const rota = useRouter(); // instanciando a referencia a variavel de rota

const menuItems = [
    {
      label: 'Home',
      command: () => navegarPara('/') //comand serve como um comando de navegaçã e usando o metodo "navegar para"
    },
    {
      label: 'Loja',
      command: () => navegarPara('/loja')
    },
    {
      label: 'Sobre',
      command: () => navegarPara('/contato') 
    },
    {
      label: 'Administrador',
      command: () => navegarPara('/admin') 
    },
    {
      label: 'Programador',
      command: () => navegarPara('/cadastro')
    }
];

// crei o const para fazer a navegação dos botões
const navegarPara = (to) => {
  router.push(to); // 'TO' representa o destino da navegação
}

</script>

<template>
 <Menubar :model="menuItems" />

 <RouterView/>

</template>

<style scoped>

</style>
