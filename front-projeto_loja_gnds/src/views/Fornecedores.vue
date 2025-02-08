<template>
    <Admin>
        <div class="container">
            <div class="p-d-flex p-jc-center ml-6 mt-5">
                <h3>Fornecedores</h3>
            </div>
            <div class="p-d-flex p-jc-center ml-6 mt-5">
                <Button label="Cadastrar" severity="info" rounded @click="cadastrar" />
            </div>
            <DataTable :value="fornecedores" tableStyle="min-width: 50rem">
                <Column field="codigo" header="Código"></Column>
                <Column field="fornecedor" header="Fornecedor"></Column>
                <Column field="email" header="E-mail"></Column>
                <Column field="telefone" header="Telefone"></Column>
                <Column header="Ações">
                    <template #body="slotProps">
                        <!-- ""slotProps é um objeto para celula atual que quero filtrar" -->
                        <Button icon="pi pi-pencil" rounded @click="editar(slotProps)" />
                        <Button icon="pi pi-trash" severity="danger" rounded @click="excluir(slotProps)" />
                    </template>
                </Column>
            </DataTable>
        </div>


        <!-- Edição -->
        <Dialog v-model="dialogVisible" :visible="dialogVisible" header="Editar Fornecedor" :style="{ width: '50rem' }"
            :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
            <form action="">
                <div class="p-field p-fluid">
                    <label for="fornecedor">Fornecedor</label>
                    <InputText id="fornecedor" v-model="formulario.fornecedor" />
                </div>
                <div class="p-field p-fluid">
                    <label for="email">E-mail</label>
                    <InputText id="email" v-model="formulario.email" />
                </div>
                <div class="p-field p-fluid">
                    <label for="telefone">Telefone</label>
                    <InputText id="telefone" v-model="formulario.codigo" />
                </div>
                <div class="p-field">
                    <Button label="Salvar" class="m-2" @click="salvarEdicao" />
                    <Button label="Cancelar" severity="secondary" class="m-2" @click="fecharDialog" />

                </div>
            </form>
        </Dialog>


        <!-- Cadastro -->
        <Dialog v-model="cadastroDialogVisable" :visible="cadastroDialogVisable" header="Cadastrar Fornecedor"
            :style="{ width: '50rem' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
            <form action="">
                <div class="p-field p-fluid">
                    <label for="fornecedor">Fornecedor</label>
                    <InputText id="fornecedor" v-model="formulario.fornecedor" />
                </div>
                <div class="p-field p-fluid">
                    <label for="email">E-mail</label>
                    <InputText id="email" v-model="formulario.email" />
                </div>
                <div class="p-field p-fluid">
                    <label for="telefone">Telefone</label>
                    <InputText id="telefone" v-model="formulario.telefone" />
                </div>
                <div class="p-field">
                    <Button label="Cadastrar" class="m-2" @click="salvarCadastro" />
                    <Button label="Cancelar" severity="secondary" class="m-2" @click="fecharDialogCadastro" />

                </div>
            </form>
        </Dialog>
    </Admin>
</template>

<script>
import axios from 'axios';
import Admin from './Admin.vue'
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import 'primeicons/primeicons.css';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';



export default {
    components: {
        Admin,
        DataTable,
        Column,
        Button,
        Dialog,
        InputText
    },
    data() {
        return {
            dialogVisible: false,
            cadastroDialogVisable: false,
            fornecedores: [],
            formulario: {
                codigo: '',
                email: '',
                telefone: '',
                fornecedor: '',
            }
        }
    },
    async mounted() {
        try {
            const urlApi = 'http://localhost:8080/api/fornecedores';
            const response = await axios.get(urlApi);

            console.log("Dados da Resposta: ", response.data);
            this.fornecedores = response.data;
        } catch (error) {
            console.error("Erro ao carregar os forncedores:", error);
        }
    },
    methods: {
        editar(slotProps) {
            this.dialogVisible = true,
            console.log('Codigo:', slotProps.data.codigo);
            console.log('Fornecedor:', slotProps.data.fornecedor);
            console.log('E-mail:', slotProps.data.email);
            console.log('Telefone:', slotProps.data.telefone);

            this.formulario.codigo = slotProps.data.codigo;
            this.formulario.fornecedor = slotProps.data.fornecedor;
            this.formulario.email = slotProps.data.email;
            this.formulario.telefone = slotProps.data.telefone;

        },

        cadastrar() {
            this.cadastroDialogVisable = true;
        },
        async salvarCadastro() {
            const dadosParaCadastrar = {
                email: this.formulario.email,
                telefone: this.formulario.telefone,
                fornecedor: this.formulario.fornecedor
            }

            if (dadosParaCadastrar.email == '' || dadosParaCadastrar.fornecedor == '' || dadosParaCadastrar.telefone == '') {
                alert('Preencha todos os campos!')
            } else {
                try {
                    const response = await axios.post(`http://localhost:8080/api/novoFornecedor`, dadosParaCadastrar);

                    console.log('Cadastrado com sucesso: ', response.data);

                    location.reload(true);

                } catch (error) {
                    console.error('Erro ao cadastrar: ', error);
                }
            }

        },
        async excluir(slotProps) {
            console.log("Excluir")
            console.log('Codigo:', slotProps.data.codigo);
            console.log('Fornecedor:', slotProps.data.fornecedor);
            console.log('E-mail:', slotProps.data.email);
            console.log('Telefone:', slotProps.data.telefone);

            if (slotProps.data.codigo) {
                const idFornecedor = slotProps.data.codigo;

                try {
                    const response = await axios.delete(`http://localhost:8080/api/fornecedores/${idFornecedor}`);

                    console.log('Excluido com sucedida: ', response.data);

                    location.reload(true);
                } catch (error) {
                    console.error('Erro ao excluir: ', error);
                }
            } else {
                console.warn('Nenhum fornecedor slecionado para exclusão');
            }

        },
        fecharDialog() {
            this.dialogVisible = false;
        },
        fecharDialogCadastro() {
            this.cadastroDialogVisable = false;
        },
        async salvarEdicao() {
            const dadosParaAtualizar = {
                email: this.formulario.email,
                telefone: this.formulario.telefone,
                fornecedor: this.formulario.fornecedor
            }

            try {
                const response = await axios.put(`http://localhost:8080/api/fornecedores/${this.formulario.codigo}`, dadosParaAtualizar);

                console.log('Atulização bem-sucedida: ', response.data);

                // a pagina e regarregada funciona do mesmo modo do que o type:"submit"
                location.reload(true);

            } catch (error) {
                console.error('Erro a atualizar: ', error);
            }
        },
    }
};
</script>


<style></style>