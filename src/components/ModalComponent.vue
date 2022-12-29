<template>
    <div>
        <notifications width="100%" />
        <loading v-model:active="isLoading" :is-full-page="true"/>
        <vue-final-modal v-model="statusModal"  :hide-overlay="false"  :click-to-close="true"    content-class="modal-dialog"   :esc-to-close="true" >
        <div class="modal-dialog">
            <div class="modal-content">
                <form @submit.prevent="submitData">
                    <div class="modal-body">
                        <h1 class="title pt-2">Reporte por fecha de nacimiento</h1>
                        <p class="subtitle pt-2">Ingresa los siguientes datos para generar tu reporte</p>   
                        <div class="row">
                            <div class="col-12">
                                <div class="mb-3 text-start" >
                                    <label for="exampleFormControlInput1" class="form-label">Descripción del reporte</label>
                                    <input type="text" class="form-control" v-model="title" placeholder="" required>
                                    <small v-if="errorMessages.title != '' " v-text="errorMessages.title" class="text-danger"></small>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-6">
                                <div class="mb-3  text-start">
                                    <label  class="form-label">Fecha inicio</label>
                                    <input type="date" required class="form-control" v-model="start_date">
                                     <small v-if="errorMessages.start_date != '' " v-text="errorMessages.start_date" class="text-danger"></small>
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="mb-3  text-start">
                                    <label class="form-label">Fecha Fin</label>
                                    <input type="date" required class="form-control" v-model="end_date">
                                    <small v-if="errorMessages.end_date != '' " v-text="errorMessages.end_date" class="text-danger"></small>
                                </div>
                            </div>
                        </div>
                        <div class="d-grid gap-2 col-6 mx-auto mt-3 mb-4">
                            <button :disabled="isDisabled==true" class=" btn btn-custom btn-warning shadow"  type="submit">Generar reporte</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        </vue-final-modal>
    </div>
</template>

<script>

import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

export default {

    name: 'ModalComponent',
    emits: ["refresh"],

    data() {
        return {
            statusModal:false,
            isLoading: false,
        
            title: null,
            start_date: null,
            end_date: null,
            
            errorMessages:{
                title: null,
                start_date: null,
                end_date: null
            },
            isDisabled:true
        }
    },
    components:{
        Loading
    },
    watch: {
        title(newValue,oldValue){
            this.enabledButton()
        },
        start_date(newValue,oldValue){
            this.enabledButton()
        },
        end_date(newValue,oldValue){
            this.enabledButton()
        }
    },
    methods: {
        enabledButton(){
            if(this.title =='' || this.start_date =='' || this.end_date || ''){
                this.isDisabled = false
            }
            else{
                this.isDisabled =true
            }
        },
        showModal(){
            this.statusModal = true;
        },

         hideModal(){
            this.statusModal = false;
        },

        submitData : function()
        {
            this.isLoading= true

            let url = this.$uri+'/api/generate-report'
            let data =   {
                title: this.title,
                start_date: this.start_date,
                end_date: this.end_date
            };
        
            this.axios.post(url,data)
            .then(response => {
                this.hideModal()
                this.resetInputs()
                this.$notify({ type: "success", title:"Mensaje", text: "El reporte se está generando." });
                this.$emit('refresh-list','');
            }).catch(error => {
                if(error.response.status == 422){
                    let errors = error.response.data.errors
                 
                    this.setValidationMessages(errors);
                }
            })
            .finally(() => {
                this.isLoading= false
            })
        },
        setValidationMessages(errors)
        {
            // limpiar mensajes
            for( const index in this.errorMessages){
                this.errorMessages[index] = ''
            }
            //asignar nuevos mensajes
            for (const index in errors) {
                this.errorMessages[index] = errors[index][0]
            }
        },

        resetInputs()
        {
            //limpiar mensajes
            for( const index in this.errorMessages){
                this.errorMessages[index] = ''
            }

            this.title      = '',
            this.start_date = '',
            this.end_date   = ''
          
        }
    },

 
}
</script>
    


<style>
.title {
    font-weight: 800;
    font-size: 20px;
    margin-bottom: 2px;
    text-align: center;
    color: #373737;
}

.sub-title {
    font-size: 12px;
    line-height: 15px;
    color: #565656;
}
.btn-custom {
    width: 220px;
    height: 50px;
    font-weight: 600;
    padding: 8px 0px;
    border-radius: 25px;
    text-align: center;
    font-size: 16px;
    line-height: 1.42857;
}
</style>