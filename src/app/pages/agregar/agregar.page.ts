import { Component, OnInit } from "@angular/core";
import { DeseosService } from "../../services/deseos.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Lista } from "../../models/lista-model";
import { ListaItem } from "../../models/lista-item-model";

@Component({
  selector: "app-agregar",
  templateUrl: "./agregar.page.html",
  styleUrls: ["./agregar.page.scss"]
})
export class AgregarPage implements OnInit {
  lista: Lista;
  nombreItem: string;

  constructor(
    private deseosServices: DeseosService,
    private route: ActivatedRoute
  ) {
    const listaId = this.route.snapshot.paramMap.get("listaId");
    this.lista = this.deseosServices.obtenerLista(listaId);
  }

  ngOnInit() {}

  agregarItem() {
    if (this.nombreItem.length === 0) {
      return;
    }

    const nuevoItem = new ListaItem(this.nombreItem);
    this.lista.items.push(nuevoItem);

    this.nombreItem = "";
    this.deseosServices.guardarStorage();
  }

  borrar(i: number) {
    this.lista.items.splice(i, 1);
    this.deseosServices.guardarStorage();
  }

  cambioCheck(item: ListaItem) {
    const pendiente = this.lista.items.filter(itemData => !itemData.completado)
      .length;

    if (pendiente === 0) {
      this.lista.terminada = true;
      this.lista.terminadaEn = new Date();
    } else {
      this.lista.terminada = false;
      this.lista.terminadaEn = null;
    }

    this.deseosServices.guardarStorage();
  }
}
