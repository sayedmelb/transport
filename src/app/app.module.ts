import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { TransportListingComponent } from './components/transport-listing/transport-listing.component';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';
import { environment } from 'src/environments/environment';
import { HttpClientModule} from '@angular/common/http';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    TransportListingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxDatatableModule,
    HttpClientModule,
    LoggerModule.forRoot({
      serverLoggingUrl: '/api/logs',
      level: environment.LOGGER_LEVEL ? NgxLoggerLevel.LOG : NgxLoggerLevel.OFF,
      serverLogLevel: environment.SERVER_LOG_LEVEL ? NgxLoggerLevel.LOG : NgxLoggerLevel.OFF,
      disableConsoleLogging: environment.CONSOLE_LOG
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
