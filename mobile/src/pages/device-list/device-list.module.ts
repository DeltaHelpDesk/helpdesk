import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DeviceListPage } from './device-list';

@NgModule({
  declarations: [
    DeviceListPage,
  ],
  imports: [
    IonicPageModule.forChild(DeviceListPage),
  ],
})
export class DeviceListPageModule {}
