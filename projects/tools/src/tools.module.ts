import { ModuleWithProviders, NgModule } from '@angular/core';
import { NumberOnlyInputDirective } from './directives/number-only-input.directive';
import { ButtonLoaderDirective } from './directives/button-loader.directive';

@NgModule({
  declarations: [NumberOnlyInputDirective, ButtonLoaderDirective],
  imports: [],
  exports: [NumberOnlyInputDirective, ButtonLoaderDirective]
})

export class ToolsModule {
  public static forRoot(environment: any): ModuleWithProviders<ToolsModule> {
    return {
      ngModule: ToolsModule,
      providers: [],
    };
  }
}