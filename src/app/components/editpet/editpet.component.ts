import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Params} from "@angular/router";
import {Pet} from "../../models/pet";
import {PetService} from "../../services/pet.service";

@Component({
  selector: 'edit-pet',
  templateUrl: './editpet.component.html'
})
export class EditPetComponent implements OnInit {
  pet = new Pet();
  petTypes: string[] = ['DOG', 'CAT'];
  isCreate = true;

  constructor(
    private petService: PetService,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      if(params['id']) {
        this.isCreate = false;
        let id = +params['id'];
        this.petService.findOne(id)
          .then(pet => this.pet = pet)
          .catch(() => {
          });
      }
    });
  }

  submitted = false;
  onSubmit() { this.submitted = true; }
  active = true;

  save(): void {
    if(this.isCreate) {
      this.petService.create(this.pet)
        .then(this.goBack)
        .catch(() => {
        });
    } else {
      this.petService.update(this.pet)
        .then(this.goBack)
        .catch(() => {
        });

    }
  }

  delete(): void {
    this.petService.delete(this.pet.id)
      .then(this.goBack)
      .catch(() => {
      });

  }

  goBack(): void {
    window.history.back();
  }
}
