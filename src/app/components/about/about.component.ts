import { Component, OnInit } from '@angular/core'
import { Depoiment } from 'src/app/models/depoiments'
import { Experience } from 'src/app/models/experience'
import { metaData } from 'src/app/models/metaData'
import { MetaTagsService } from 'src/app/services/metaTags/meta-tags.service'
import { CurriculumService } from '../../services/curriculum/curriculum.service'

@Component({
  selector: 'app-components',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  curriculum: any;
  displayingData: 'CUR' | 'PES' | 'DEP' = 'CUR';
  expRanks: any = {};
  techsRanks: any = {};
  libsRanks: any = {};
  toolsRanks: any = {};

  depoiments: Depoiment[];

  experiences: Experience[];

  constructor(
    private curriculumService: CurriculumService,
    private metaService: MetaTagsService
  ) { }

  ngOnInit() {
    this.setMetaData();
    this.getCurricyulum();
    this.getDepoiments();
    this.geExperience();
  }

  setMetaData() {
    this.metaService.setMetaData(new metaData(
      'Sobre Mim',
      'Um pouco sobre minha história profissional e pessoal.',
      'http://www.kelvinmarques.com.br/sobre',
      'Site, Website, desenvolvimento web, página, Kelvin, Relatório Anual, Solução, Currículo, pessoal, habilidades'
    ));
  }

  getCurricyulum() {
    this.curriculumService.getCurriculum().subscribe(data => {

      this.expRanks = data.experiencia.map(exp => {
        exp.rank = this.setRankHTML(exp.rank);
        return exp;
      });

      this.techsRanks = data.techs.map(exp => {
        exp.rank = this.setRankHTML(exp.rank);
        return exp;
      });

      this.libsRanks = data.libs.map(lib => {
        lib.rank = this.setRankHTML(lib.rank);
        return lib;
      });

      this.toolsRanks = data.ferramentas.map(tool => {
        tool.rank = this.setRankHTML(tool.rank);
        return tool;
      });

      this.curriculum = data;

    });
  }

  getDepoiments() {
    this.curriculumService.getDepoiments().subscribe((data: Depoiment[]) => {
      this.depoiments = data;
    });
  }

  geExperience() {
    this.curriculumService.getExperience().subscribe((data: Experience[]) => {
      this.experiences = data;
    });
  }

  setRankHTML(rank) {
    let html = '';
    for (let x = 1; x <= rank; x++) {
      html += '<i class="fa fa-star"></i>';
    }
    return html;
  }

}
