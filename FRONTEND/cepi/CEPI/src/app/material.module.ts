import {NgModule} from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import{MatListModule} from '@angular/material/list';
import{MatIconModule} from'@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {FormsModule} from '@angular/forms';
import{MatFormFieldModule} from '@angular/material/form-field';
import{MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import { MatNativeDateModule } from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import {MatMenuModule} from '@angular/material/menu';
import {MatSelectModule} from '@angular/material/select';
import {MatPaginatorModule} from '@angular/material/paginator';
import{MatCardModule} from '@angular/material/card';
import {MatSortModule} from '@angular/material/sort';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatStepperModule} from '@angular/material/stepper';
import {MatChipsModule} from '@angular/material/chips';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatTreeModule} from '@angular/material/tree';
import {MatRadioModule} from '@angular/material/radio';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'; 

@NgModule({
  imports:[MatSidenavModule,MatButtonModule, MatListModule,MatIconModule,MatToolbarModule,FormsModule,MatFormFieldModule
    ,MatInputModule,MatTableModule, MatNativeDateModule, MatDatepickerModule, MatDialogModule,MatSelectModule,MatMenuModule
    ,MatPaginatorModule,MatCardModule, MatSortModule, MatCheckboxModule, MatAutocompleteModule, MatStepperModule, MatChipsModule, MatTreeModule,
     MatRadioModule, MatProgressSpinnerModule],
  exports:[MatSidenavModule,MatButtonModule, MatListModule,MatIconModule,MatToolbarModule,FormsModule,MatFormFieldModule
    ,MatInputModule,MatTableModule, MatDatepickerModule,MatDialogModule,MatSelectModule,MatMenuModule,MatPaginatorModule
    ,MatCardModule, MatSortModule, MatCheckboxModule, MatAutocompleteModule, MatStepperModule, MatChipsModule, MatTreeModule, MatRadioModule, MatProgressSpinnerModule],
})
export class MaterialModule{
}