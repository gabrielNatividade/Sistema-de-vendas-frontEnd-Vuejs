import { navegarPara } from './Admin.vue';

export const menuItems = [
{
label: 'Fornecedores',
command: () => navegarPara('/fornecedores')
},
{
label: 'Produtos',
command: () => navegarPara('/produtos')
}
];
