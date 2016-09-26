import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Params} from "@angular/router";
import {Pet} from "../../models/pet";
import {PetService} from "../../services/pet.service";

@Component({
  selector: 'pet-detail',
  templateUrl: './viewpet.component.html',
  styleUrls: ['./viewpet.component.css']
})
export class ViewPetComponent implements OnInit {
  pet: Pet;

  constructor(
    private petService: PetService,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      let id = +params['id'];
      this.petService.findOne(id)
        .then(pet => this.pet = pet).catch(() => {});
    });
  }

  goBack(): void {
    window.history.back();
  }
}
