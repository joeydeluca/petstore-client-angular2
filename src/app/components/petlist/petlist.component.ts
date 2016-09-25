import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {Pet} from "../../models/pet";
import {PetService} from "../../services/pet.service";
import {AuthService} from "../../services/auth.service";


@Component({
  selector: 'pet-list',
  templateUrl: './petlist.component.html',
  styleUrls:  ['./petlist.component.css']
})
export class PetListComponent implements OnInit {
  pets: Pet[];
  selectedPet: Pet;

  constructor(
    private router: Router,
    private petService: PetService,
    private authService: AuthService) { }

  getPets(): void {
    this.petService.findMany()
      .then(heroes => this.pets = heroes)
      .catch(() => {});
  }

  ngOnInit(): void {
    this.getPets();
  }

  onSelect(pet: Pet): void {
    this.selectedPet = pet;
  }

  gotoDetail(pet: Pet): void {
    this.router.navigate(['/editpet', pet.id]);
  }

  add(): void {
    this.router.navigate(['/editpet']);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
