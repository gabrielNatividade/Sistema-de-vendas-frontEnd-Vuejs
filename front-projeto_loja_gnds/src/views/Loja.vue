<script setup>
import {ref, onMounted} from 'vue'; //onMounted UM PACOTE DO VUE.JS
import axios from 'axios';
import {stringifyQuery} from 'vue-router';

const produtos = ref([]); //VARIAVEL REATIVA QUE SERA ARMAZENADOS DA API

const conversorBufferParaURL = (buffer) => {
    try {
        if(!buffer){
            return '';
        }else{
            const bytes = new Uint8Array(buffer.data); //passa todo arquivo do buffer para o Uint

            const binario = bytes.reduce((acc, byte) => acc + String.fromCharCode(byte), ''); //converte uma matriz em byte, em uma constante binario

            const base64String = btoa(binario);
            
            return `data:${buffer.type};base64,${base64String}`; // é usado para saber o tipo do conteudo, apresentar a imagem no BD
        }
    } catch (error) {
        console.error('Erro ao converter um Buffer a URL', error);
        return '';
    }
};

onMounted(async() =>{
    try {
        const response = await axios.get('http://localhost:8080/api/listarProdutos');
        console.log(response.data);
        produtos.value = response.data.map(produtos => ({
            ...produtos, 
            imagem: conversorBufferParaURL(produtos.imagem), //convertendo o BUffer de imagem para URl
        })) 
    } catch (error) {
        console.error( 'Erro ao buscar dados da API', error);
    }
});

/*
const produtos =[
    {
        id: 1,
        name: 'Produto A',
        preco: '10,00',
        quantidade: '100',
        img: 'src/img/drone.jpg'
    },
    {
        id: 1,
        name: 'Produto B',
        preco: '10,00',
        quantidade: '100',
        img: 'src/img/notebook.jpg'
    },
    {
        id: 3,
        name: 'Produto C',
        preco: '10,00',
        quantidade: '100',
        img: 'src/img/tel.jpg'
    },
    {
        id: 4,
        name: 'Produto C',
        preco: '10,00',
        quantidade: '100',
        img: 'src/img/tel.jpg'
    }
]
*/
</script>

<template>
    <div class="surface-ground px-4 py-5 md:px-6 lg:px-8">
        <div class="grid" >
            <div class="col-12 md:col-6 lg:col-3" v-for="produto in produtos" :key="produto.codigo">
                <div class="surface-card shadow-2 p-3 border-round">
                    <div class="flex justify-content-between mb-3">
                        <div>
                            <span class="block text-500 font-medium mb-3">{{produto.produtos}}</span>
                            <div class="text-900 font-medium text-xl">R$ {{produto.preco}}</div>
                        </div>
                        <div style="width: 100px;" >
                            <img :src="produto.imagem" style="width: 100px; object-fit: cover">
                        </div>

                    </div>
                    <span class="text-green-500 font-medium">Quantidade:</span>
                    <span class="text-500">{{produto.quantidade}}</span>
                </div>
            </div>            
        </div>
    </div>
</template>

<style></style>