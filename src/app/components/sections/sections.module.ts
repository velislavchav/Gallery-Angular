import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GallerySectionComponent } from './gallery-section/gallery-section.component';
import { EventsSectionComponent } from './events-section/events-section.component';
import { BlogSectionComponent } from './blogs-section/blog-section.component';
import { SectionsRoutingModule } from './sections-routing.module';

@NgModule({
  declarations: [GallerySectionComponent, EventsSectionComponent, BlogSectionComponent],
  imports: [
    CommonModule,
    SectionsRoutingModule,
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class SectionModule { }
