import { Component } from '@angular/core';
import { NavController, ActionSheetController, LoadingController } from 'ionic-angular';
import { IonicPage } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';

@IonicPage()
@Component({
  selector: 'page-ocrad',
  templateUrl: 'ocrad.html'
})

export class OcradPage
{
  srcImage: string;
  OCRAD: any;

  constructor( public navCtrl: NavController,public camera : Camera, public actionSheetCtrl: ActionSheetController, public loadingCtrl: LoadingController)
  {

  }

  presentActionSheet()
  {
    const actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Choose Photo',
          handler: () =>
          {
            this.getPicture(0); // 0 == Library
          }
        },{
          text: 'Take Photo',
          handler: () =>
          {
            this.getPicture(1); // 1 == Camera
          }
        },{
          text: 'Demo Photo',
          handler: () =>
          {
            this.srcImage = 'assets/image/words.png';
          }
        },{
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  getPicture(sourceType: number)
  {
      this.camera.getPicture({
            quality: 100,
            destinationType: 0, // DATA_URL
            sourceType,
            allowEdit: true,
            saveToPhotoAlbum: false,
            correctOrientation: true
      })
      .then(
              (imageData) =>
              {
                    this.srcImage = 'data:image/jpeg;base64,${imageData}';
              },
              (err) =>
              {
                console.log('ERROR -> ${JSON.stringify(err)}');
              }
            );
  }

  analyze()
  {
      let loader = this.loadingCtrl.create({ content: 'Please wait...' });
      loader.present();
      (<any>window).OCRAD(document.getElementById('image'), text => {
            loader.dismissAll();
            alert(text);
            console.log(text);
      });
  }

  restart()
  {
      this.srcImage = '';
      this.presentActionSheet();
  }
}
