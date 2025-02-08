<template>
    <Admin>
        <!-- Conteúdo que será inserido no slot -->
        <div class="p-d-flex p-jc-center ml-6 mt-5">
            <h2>Produtos</h2>
        </div>
        <div class="p-d-flex p-jc-center m-2">
            <Button label="Cadastrar" severerity="info" rounded @click="cadastrar()" />
        </div>

        <DataTable :value="produtos" tableStyle="min-width: 50rem">
            <Column field="codigo" header="Código"></Column>
            <Column field="produtos" header="Produto"></Column>
            <Column field="imagem" header="imagem">
                <template #body="slotProps">
                    <img :src="conversorBufferParaURL(slotProps.data.imagem)" style="width: 100px; object-fit: cover;">
                </template>
            </Column>
            <Column field="quantidade" header="Quantidade"></Column>
            <Column field="preco" header="Preço"></Column>
            <Column field="codigo_fornecedor" header="Fornecedor"></Column>
            <Column header="Ações">
                <template #body="slotProps">
                    <!-- ""slotProps é um objeto para celula atual que quer filtrar" -->
                    <Button icon="pi pi-pencil" rounded @click="editar(slotProps)" />
                    <Button icon="pi pi-trash" severity="danger" rounded @click="excluir(slotProps)" />
                </template>
            </Column>
        </DataTable>

        <!-- Edição -->
        <Dialog v-model="dialogVisible" :visible="dialogVisible" modal header="Editar Produto" :style="{ width: '50rem' }"
            :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
            <form action="">
                <div class="p-field p-fluid">
                    <label for="produtos">Produto</label>
                    <InputText id="produtos" v-model="formulario.produtos" />
                </div>
                <div class="p-field p-fluid">
                    <label for="imagem">Upload de Imagem</label>
                    <FileUpload mode="basic" name="image" type="file" customUpload @uploader="customBase64Uploader" :auto="true" />
                </div>
                <div class="p-field p-fluid">
                    <label for="quantidade">Quantidade</label>
                    <InputText id="quantidade" v-model="formulario.quantidade" />
                </div>
                <div class="p-field p-fluid">
                    <label for="preco">Preço</label>
                    <InputText id="preco" v-model="formulario.preco" />
                </div>
                <div class="p-field p-fluid">
                    <label for="fornecedor">Fornecedor</label>
                    <InputText id="fornecedor" v-model="formulario.codigo_fornecedor" />
                </div>
                <div class="p-field">
                    <Button label="Salvar" class="m-2" @click="atualizarProduto()" />
                    <Button label="Cancelar" severity="secondary" class="m-2" @click="fecharDialog" />

                </div>
            </form>
        </Dialog>

        <!-- Cadastrar -->
        <Dialog v-model="cadastroDialogVisible" :visible="cadastroDialogVisible" modal header="Cadastro de Produto"
            :style="{ width: '50rem' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
            <form action="">
                <div class="p-field p-fluid">
                    <label for="codigo">Código</label>
                    <InputText id="codigo" v-model="formulario.codigo" />
                </div>
                <div class="p-field p-fluid">
                    <label for="produtos">Produto</label>
                    <InputText id="produtos" v-model="formulario.produtos" />
                </div>
                <div class="p-field p-fluid">
                    <label for="imagem">Upload de Imagem</label>
                    <FileUpload mode="basic" name="imagem" type="file" customUpload @uploader="customBase64Uploader" :auto="true" />
                </div>
                <div class="p-field p-fluid">
                    <label for="quantidade">Quantidade</label>
                    <InputText id="quantidade" v-model="formulario.quantidade" />
                </div>
                <div class="p-field p-fluid">
                    <label for="preco">Preço</label>
                    <InputText id="preco" v-model="formulario.preco" />
                </div>
                <div class="p-field p-fluid">
                    <label for="fornecedor">Fornecedor</label>
                    <InputText id="fornecedor" v-model="formulario.codigo_fornecedor" />
                </div>
                <div class="p-field">
                    <Button label="Salvar" class="m-2" @click="salvarProduto()" />
                    <Button label="Cancelar" severity="secondary" class="m-2" @click="fecharDialogCadastro()" />

                </div>
            </form>
        </Dialog>

    </Admin>
</template>

<script>
import axios from 'axios';
import Admin from './Admin.vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import 'primeicons/primeicons.css';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import FileUpload from 'primevue/fileupload';


export default {
    components: {
        Admin,
        DataTable,
        Column,
        Button,
        Dialog,
        InputText,
        FileUpload
    },
    data() {
        return {
            dialogVisible: false,
            cadastroDialogVisible: false,
            produtos: [],
            formulario: {
                codigo: '',
                produtos: '',
                quantidade: '',
                preco: '',
                codigo_fornecedor: '',
                imagem: ''
            }
        }
    },
    async mounted() {
        try {
            const urlApi = 'http://localhost:8080/api/listarProdutos';
            const response = await axios.get(urlApi);

            console.log("Dados da Resposta: ", response.data);
            this.produtos = response.data;
        } catch (error) {
            console.error("Erro ao carregar os produtos:", error);
        }
    },

    methods: {
        conversorBufferParaURL(buffer) {
            try {
                if (!buffer) {
                    return ''; // Retorna string vazia caso o buffer não seja válido.
                } else {
                    // Cria um array de bytes a partir do buffer recebido.
                    const bytes = new Uint8Array(buffer.data);

                    // Converte o array de bytes para uma string binária.
                    const binario = bytes.reduce((acc, byte) => acc + String.fromCharCode(byte), '');

                    // Codifica a string binária para base64.
                    const base64String = btoa(binario);

                    // Retorna a URL no formato base64, incluindo o tipo MIME.
                    return `data:${buffer.type};base64,${base64String}`;
                }
            } catch (error) {
                console.error('Erro ao converter o buffer para URL:', error);
                return ''; // Retorna string vazia em caso de erro.
            }
        },
        editar(slotProps) {
            this.dialogVisible = true;



            this.formulario.codigo = slotProps.data.codigo;
            this.formulario.produtos = slotProps.data.produtos;
            this.formulario.quantidade = slotProps.data.quantidade;
            this.formulario.preco = slotProps.data.preco;
            this.formulario.codigo_fornecedor = slotProps.data.codigo_fornecedor;
            this.formulario.imagem = slotProps.data.imagem;

        },

        cadastrar() {
            this.formulario.codigo = "";
            this.formulario.produtos = "";
            this.formulario.quantidade = "";
            this.formulario.preco = "";
            this.formulario.codigo_fornecedor = "";

            this.cadastroDialogVisible = true;
        },
        async excluir(slotProps) {

            if (slotProps.data.codigo) {
                const idProdutos = slotProps.data.codigo;

                try {
                    const response = await axios.delete(`http://localhost:8080/api/produtos/${idProdutos}`);

                    console.log('Excluido bem-sucedida: ', response.data);

                    location.reload(true);
                } catch (error) {
                    console.error('Erro ao excluir: ', error);
                }
            } else {
                console.warn('Nenhum Preoduto selecionado para exclusão');
            }

        },
        fecharDialog() {
            this.dialogVisible = false;
        },
        fecharDialogCadastro() {
            this.cadastroDialogVisible = false;
        },
        async salvarProduto() {
            console.log('Método salvarProduto foi chamado!');
            try {
                const formData = new FormData();
                formData.append('codigo', this.formulario.codigo);
                formData.append('produtos', this.formulario.produtos);
                formData.append('quantidade', this.formulario.quantidade);
                formData.append('preco', this.formulario.preco);
                formData.append('codigo_fornecedor', this.formulario.codigo_fornecedor);
                formData.append('imagem', this.formulario.imagem);

                const response = await axios.post('http://localhost:8080/api/novoProduto', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

                this.cadastroDialogVisible = false;
                location.reload(true);
                console.log('Produto cadastrado com sucesso:', response.data);
            } catch (error) {
                console.error('Erro ao cadastrar o produto:', error);
            }

        },

        async atualizarProduto() {
            console.log('Método atualziarProduto foi chamado!');
            try {
                const formData = new FormData();
                formData.append('codigo', this.formulario.codigo);
                formData.append('produtos', this.formulario.produtos);
                formData.append('quantidade', this.formulario.quantidade);
                formData.append('preco', this.formulario.preco);
                formData.append('codigo_fornecedor', this.formulario.codigo_fornecedor);
                formData.append('imagem', this.formulario.imagem);

                const response = await axios.put(`http://localhost:8080/api/produtos/${this.formulario.codigo}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

                this.dialogVisible = false;
                console.log('Produto atualizado com sucesso', response.data);
                location.reload(true);

            } catch (error) {
                console.error('Erro ao atualizar o produto:', error);
            }
        },

        customBase64Uploader(event) {
            const file = event.files[0];
            this.formulario.imagem = file;
        }
    }
};

</script>



<style></style>