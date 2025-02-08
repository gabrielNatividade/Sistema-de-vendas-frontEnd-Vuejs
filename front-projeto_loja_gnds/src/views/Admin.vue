<template>
    <div>
        <div class="p-d-flex p-jc-center ml-6 mt-5">
            <!-- p-flex eu to utilizando um propriedade de display flex
             p-jc-center utilizando para centralizar uma div -->
            <h2>Dashboard Administrativo</h2>

            <Button label="SAIR" severity="info" rounded @click="sair" />

        </div>
        <TabMenu :model="menuItems" />
        <div class="main-content">


            <slot></slot>
        </div>
    </div>
</template>

<script setup>
import TabMenu from 'primevue/tabmenu';
import Button from 'primevue/button';
import { useRouter } from 'vue-router';
const rota = useRouter();

const menuItems = [
    {
        label: 'Fornecedores',
        command: () => navegarPara('/Fornecedores')
    },

    {
        label: 'Produtos',
        command: () => navegarPara('/produtos')
    },
];

const navegarPara = (to) => {
    rota.push(to); // 'TO' representa o destino da navegação
}

const usuario = localStorage.getItem('usuario');

if (usuario != 'logou') {
    console.log('veruficou que não fez o login');
    navegarPara('/login')
}

function sair() {
    localStorage.setItem('usuario','');
    location.reload(true);
}

</script>


<style>
.main-content {
    margin-top: 20px;
}
</style>