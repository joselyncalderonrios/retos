import { Component, OnInit ,ViewChild} from '@angular/core';
import { PersonaServiceService } from 'src/app/personaService/persona-service.service';
import { HttpClient } from '@angular/common/http';
import { from } from 'rxjs'
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { persona } from 'src/app/model/persona';


@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})
export class PersonaComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(
    private http: HttpClient,
    private personaService:PersonaServiceService
  ) { }

  personas: any[] = []; 
  lspersonas = null;
  
  total_personas=10;
  itemsPerPage;
  displayedColumns: string[] = [
    'genero',
    'nombre',
    'ubicacion',
    'correo',
    'fecha',    
    'fotografia'
  ];
  ngOnInit() {
    this.total_personas=10;
    this.itemsPerPage=5
    this.listar();
    let lsPersonasFilter: persona[] = [];
    lsPersonasFilter = this.personas;
    this.lspersonas = new MatTableDataSource<persona>(lsPersonasFilter);
    this.lspersonas.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.lspersonas.filter = filterValue.trim().toLowerCase();
  }
  listar() {     
      from(fetch('https://randomuser.me/api/?results=10'))
        .subscribe(
          (response) => {
            if (response.ok) {
              response.json().then((data) => {
                const results = data.results.map((result: any) => ({
                  gender: result.gender,
                  name: result.name.title + " " + result.name.first ,
                  location:  result.location.street.name +  " " + result.location.street.number + " "+ result.location.city,
                  email: result.email,
                  dob: result.dob.date,
                  picture: result.picture.medium
                }));
                this.personas = results;
                this.lspersonas=this.personas;
                
              });
            } else {
              throw new Error('La solicitud falló.');
            }
          },
          (error) => {
            console.error('Hubo un problema con la solicitud:', error);
          }
        );
    }

      
    
    
  

  

  
}
