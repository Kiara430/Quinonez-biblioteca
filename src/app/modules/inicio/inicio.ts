import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TodosLibrosService } from '../todos-libros/todos-libros.service';

@Component({
  selector: 'app-inicio',
  imports: [RouterLink],
  templateUrl: './inicio.html',
})
export class Inicio {

  @ViewChild('contenedorLibros')
  contenedorLibros!: ElementRef;

  @ViewChild('contenedorRecientes')
  contenedorRecientes!: ElementRef;

  @ViewChild('contenedorVideos')
  contenedorVideos!: ElementRef;

  librosMasLeidos: any[] = [];
  librosRecientes: any[] = [];
  videos: any[] = [];

  constructor(private librosService: TodosLibrosService) {
    this.cargarLibros();
  }

  cargarLibros() {
    this.librosService.obtenerLibros().subscribe({
      next: (respuesta) => {

        const libros = respuesta.data;

        this.librosMasLeidos = libros.slice(0, 10).map((libro, index) => ({
          id: libro.id,
          posicion: index + 1,
          titulo: libro.title,
          autor: libro.author,
          portada: libro.fileUrl
        }));

        this.librosRecientes = libros.slice(0, 10).map((libro) => ({
          id: libro.id,
          titulo: libro.title,
          autor: libro.author,
          portada: libro.fileUrl
        }));

      },

      error: (error) => {
        console.error('Error al cargar los libros:', error);
      }
    });
  }

  desplazarLibros(direccion: number) {
    this.contenedorLibros.nativeElement.scrollBy({
      left: direccion * 400,
      behavior: 'smooth'
    });
  }

  desplazarRecientes(direccion: number) {
    this.contenedorRecientes.nativeElement.scrollBy({
      left: direccion * 400,
      behavior: 'smooth'
    });
  }

  desplazarVideos(direccion: number) {
    this.contenedorVideos.nativeElement.scrollBy({
      left: direccion * 400,
      behavior: 'smooth'
    });
  }
}