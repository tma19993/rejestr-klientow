import { NgModule } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { MaterialModule } from '../shared/material/material.module';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { SpinnerInterceptor } from './interceptors/spinner.interceptor';
import { HeaderClassInterceptor } from './interceptors/header.class.interceptor';
@NgModule({
  declarations: [HeaderComponent, SpinnerComponent],
  imports: [
    SharedModule,
    MaterialModule,
    RouterModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeaderClassInterceptor,
      multi: true,
    },
  ],
  exports: [HeaderComponent, SpinnerComponent],
})
export class CoreModule {}
