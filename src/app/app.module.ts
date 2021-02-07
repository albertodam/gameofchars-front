import { SocketService } from './core/services/socket.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GithubComponent } from './base/github/github.component';
import { HeaderComponent } from './base/header/header.component';
import { TokenInterceptor } from './core/interceptor/token.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    GithubComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private readonly socketService: SocketService){}
 }
