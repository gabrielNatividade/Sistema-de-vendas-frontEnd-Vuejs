<template>
    <div class="login-form">
        <div class="card">
            <h1>Login</h1>
            <div class="p-field">
                <InputText placeholder="Usuario" v-model="usuario"/>
            </div>
            <div class="p-field">
                <Password placeholder="Senha" v-model="senha"/>
            </div>
            <div class="p-field">
                <Checkbox id="cd1" v-model="lembrarsenha"/>
                <label for="cd1">Lembrar senha</label>
            </div>
            <Button label="Logar" @click="login"/>
            <Toast ref="toast" />
        </div>
    </div>
    <!-- criando cards para um tela de login -->
</template>

<script>
import axios from 'axios';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Checkbox from 'primevue/checkbox';
import Button from 'primevue/button';
import Toast from 'primevue/toast';
import { vModelCheckbox } from 'vue';

export default { //serve par importar o valor de um padrão especifico
    components:{
    InputText,
    Password,
    Checkbox,
    Button,
    Toast,
    vModelCheckbox
},
    data(){ //metódo DATA, no componente vue js é usando para definir o estado inicial dos componentes
        return{
            usuario: '',
            senha: '',
            lembrarsenha: false, //propiedade boleana 
        }
    },
    methods:{
        // utilizando uma API para acessar no try
        async login(){
            try {
                const response = await axios.post('http://localhost:8080/api/login', {
                    usuario: this.usuario,
                    senha: this.senha,
                    // passando o objeto que criei no DATA
                });

                //serve para armazenar um dado com a chave usuario e seta o "Logou"
                localStorage.setItem('usuario','logou');
                this.$router.push('/admin');

            } catch (error) {
                this.$refs.toast.add({
                    severity: 'error',
                    summary: 'Ops!! Algo deu Errado!',
                    detail: 'Usuários ou senha incorretos',
                    // DETAIL é o conteudo que sera mostrado para o usuario
                    life: 4000,
                    // LIFE é o tempo que permanece a pop up na tela.
                }); // THIS refere-se a instancia do viu port atual.
            }
        }
    },
};
</script>

<style>
.login-form{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

.card{
    padding: 2rem;
    /* REM mostra o tamanho da fonte raiz, ou seja uso o dobro do tamanho da fonte definida no elemento pricipal */
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0,0.3);
}

.p-field{
    margin-bottom: 5px;
}

label{
    margin-left: 5px;
}
</style>