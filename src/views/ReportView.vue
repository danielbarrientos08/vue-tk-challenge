<template>
  <div>
    <notifications width="100%" />

    <loading v-model:active="isLoading"  :is-full-page="true" />
    <br>
    <h2 style="text-align: center;">Generador de reportes TK</h2>

    <div class="row mt-5">
      <div class="col-6 offset-md-3">
        <table class=" table table-bordered table-custom">
          <thead>
            <th>Título</th>
            <th>Fecha de creación</th>
            <th>Acción</th>
          </thead>
          <tbody>
            <tr v-for="report in listReports" v-bind:key="report.id">
              <td>{{report.title}}</td>
              <td>{{report.created_at}}</td>
              <td><a href="#" @click.prevent="downloadReport(report.id,report.title)"> Descargar</a> </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div style="text-align: center;">
      <button class="btn btn-custom btn-warning mt-4" @click="showModal">Crear Reporte</button>

    </div> 


    <modal-component ref="ModalComponent"  v-on:refresh-list="listReport"/>
  </div>

</template>
<script>
import ModalComponent    from '@/components/ModalComponent'   
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
  export default {
    name: 'ReportView',
    data() {
        return {
          listReports: [],
          isLoading: false,
        }
    },
    created() {
       this.listReport()
    },
    components:{
      ModalComponent,
      Loading
    },
    methods: 
    {
      listReport()
      {
        this.isLoading = true;
        
        let url = this.$uri+'/api/list-reports'
        this.axios.get(url)
        .then(response => {
            this.listReports = response.data.response 
        })
        .catch(error => {
        })
        .finally(() => {
            this.isLoading = false;
        })
      },
      showModal(){
        this.$refs.ModalComponent.showModal(); 
      },
      downloadReport( reportId,reportTitle)
      {
        this.isLoading = true;
        let url = this.$uri+'/api/get-report/'+reportId
        const req = this.axios({
            method: "get",
            url:url,
            responseType: "blob",
        })
        .then(response => 
        {
            var my_blob = new Blob(
              [response.data],
              {type : "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64"}
            )
            const reporLink = document.createElement("a");
            reporLink.href = window.URL.createObjectURL(my_blob);
            reporLink.download = 'Reporte_'+reportTitle+'_'+new Date().getTime()+'.xlsx'
            reporLink.click();
        })
        .catch(error => 
        {
            if(error.response.status == 404){
              this.$notify({ type: "info", title:"Mensaje", text: "Este reporte aún se esta procesando." });
            }
        })
        .finally(() => {
            this.isLoading= false
        })
      }
    },
  }
</script>

<style >
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
.table-custom{
    background-color: rgb(59, 70, 219);
    border-radius: 0px;
    border: 2px solid rgb(59, 70, 219);
    --wp-dark-mode-inline-bgcolor: #2c3294;
    --wp-dark-mode-inline-border-top: #292f86;
    --wp-dark-mode-inline-border-right: #292f86;
    --wp-dark-mode-inline-border-bottom: #292f86;
    --wp-dark-mode-inline-border-left: #292f86;
    color: azure;  
    border-collapse:separate;
    border-spacing: 15;
    border: solid azure 0.5px;
    border-radius:40px;
    -moz-border-radius:40px;
    -webkit-border-radius: 10px;  
}
.table-custom a {
  color: azure;
}
    
        
</style>