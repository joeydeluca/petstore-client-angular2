import {Component, OnInit} from "@angular/core";
import {Pet} from "../../models/pet";
import {Router, ActivatedRoute, Params} from "@angular/router";
import {PetService} from "../../services/pet.service";

@Component({
  selector: 'pet-search',
  templateUrl: './petsearch.component.html',
  styleUrls: ['./petsearch.component.css']
})
export class PetSearchComponent implements OnInit {
  pets: Pet[];
  petTypes: string[] = ['All', 'Dog', 'Cat'];
  petType = this.petTypes[0];
  keyword = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private petService: PetService) { }

  ngOnInit(): void {

    this.route.params.forEach((params: Params) => {
      this.petType = params['petType'] != undefined ? params['petType'] : this.petType;
      this.keyword = params['keyword'] != undefined ? params['keyword'] : this.keyword;
    });

    this.search();
  }

  search(): void {
    this.petService.search(this.keyword, this.petType).then(pets => this.pets = pets).catch(() => {});
  }

  viewPet(pet: Pet): void {
    this.router.navigate(['/pet', pet.id]);
  }

}
