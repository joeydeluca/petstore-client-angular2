import {Component, OnInit} from "@angular/core";

import {Router} from "@angular/router";
import {PetService} from "../../services/pet.service";
import {Pet} from "../../models/pet";

@Component({
  selector: 'my-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  pets: Pet[];

  constructor(
    private petService: PetService,
    private router: Router) {}

  ngOnInit(): void {
    this.petService.findMany().then(heroes => this.pets = heroes.slice(0, 3)).catch(() => {});
  }

}
