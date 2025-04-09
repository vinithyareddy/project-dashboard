import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AppComponent } from './app/app.component';
import { appRoutes } from './app/app.routes'; // Assuming routes are extracted
import { importProvidersFrom } from '@angular/core'; // Import this
import { MatNativeDateModule } from '@angular/material/core'; // Import MatNativeDateModule
// Import other necessary global providers if needed (e.g., HttpClientModule)

// Ensure appRoutes are defined (extract from AppRoutingModule if needed)

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(appRoutes), // Provide routes
    provideAnimations(), // Provide animations globally
    importProvidersFrom(MatNativeDateModule) // Import providers from modules needed globally
    // Add other global providers here
  ]
})
  .catch(err => console.error(err));
