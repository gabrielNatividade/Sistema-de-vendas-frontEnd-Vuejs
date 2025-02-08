<script setup>
import Button from 'primevue/button'; // Os links das importações do primevue, ou seja seus "componentes", estão funcionandos devido a está importação 
</script>

<template>
    <div class="grid grid-nogutter surface-section text-800">
        <div class="col-12 md:col-6 p-6 text-center md:text-left flex align-items-center ">
            <section>
                <span class="block text-6xl font-bold mb-1">Minha Loja</span>
                <div class="text-6xl text-primary font-bold mb-3">Os Melhores produtos</div>
                <p class="mt-0 mb-4 text-700 line-height-3">Explore a Minha Loja de tecnologia, tem muito a te oferecer vem
                    comprar aqui seu macaco magna aliqua.</p>

                <Button class="mx-1" label="Saiba Mais" v-tooltip="'Veja os detalhes sobre os nosso produtos'" type="button" rounded />
                <Button class="mx-1 " label="Novas Promoções" v-tooltip="'Acesse as melhores promoções'" severity="secondary" rounded />

            </section>
        </div>
        <div class="col-12 md:col-6 overflow-hidden">
            <img src="../img/drone.jpg" alt="Image" class="md:ml-auto block md:h-full"
                style="clip-path: polygon(8% 0, 100% 0%, 100% 100%, 0 100%)" />
        </div>
    </div>
    <!-- home -->
    <div class="surface-ground px-4 py-8 md:px-6 lg:px-8">
        <div class="text-900 font-bold text-6xl mb-4 text-center">Departamento</div>
        <div class="text-700 text-xl mb-6 text-center line-height-3">Uma linha de produtos pronto para atender você.</div>

        <div class="grid">
            <div class="col-12 lg:col-4">
                <div class="p-3 h-full">
                    <div class="shadow-2 p-3 h-full flex flex-column surface-card" style="border-radius: 6px">
                        <div class="text-900 font-medium text-xl mb-2">Informática</div>
                        <hr class="my-3 mx-0 border-top-1 border-none surface-border" />
                        <img src="../img/infor.jpg" alt="informática">
                        <hr class="mb-3 mx-0 border-top-1 border-none surface-border mt-auto" />
                        <Button label="Consultar" rounded />
                    </div>
                </div>
            </div>

            <div class="col-12 lg:col-4">
                <div class="p-3 h-full">
                    <div class="shadow-2 p-3 h-full flex flex-column surface-card" style="border-radius: 6px">
                        <div class="text-900 font-medium text-xl mb-2">Games</div>
                        <hr class="my-3 mx-0 border-top-1 border-none surface-border" />
                        <img src="../img/game.jpg" alt="Games">
                        <hr class="mb-3 mx-0 border-top-1 border-none surface-border" />
                        <Button label="Consultar" rounded />
                    </div>
                </div>
            </div>

            <div class="col-12 lg:col-4">
                <div class="p-3 h-full">
                    <div class="shadow-2 p-3 flex flex-column surface-card" style="border-radius: 6px">
                        <div class="text-900 font-medium text-xl mb-2">Telefonia</div>

                        <hr class="my-3 mx-0 border-top-1 border-none surface-border" />
                        <img src="../img/tel.jpg" alt="Telefonia">
                        <hr class="mb-3 mx-0 border-top-1 border-none surface-border" />
                        <Button label="Consultar" rounded />
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Informações de Produtos -->

    <div class="surface-section px-4 py-8 md:px-6 lg:px-8">
        <div class="text-700 text-center">
            <div class="text-blue-600 font-bold mb-3"><i class="pi pi-discord"></i>&nbsp;Contatos</div>
            <div class="text-900 font-bold text-5xl mb-3">Entre em Contato</div>
            <div class="text-700 text-2xl mb-5">Ficariamos muito Feliz em receber sua mensagem.</div>
            <Button label="WhatsApp" icon="pi pi-discord"
                class="font-bold px-5 py-3 p-button-raised p-button-rounded white-space-nowrap"></Button>
        </div>
    </div>
</template>


<style></style>