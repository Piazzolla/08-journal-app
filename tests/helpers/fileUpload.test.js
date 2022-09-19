import { fileUpload } from "../../src/helpers/fileUpload"
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: 'piazzolla',
    api_key: '385748733115855',
    api_secret: '3DnEPhfmA_Pe2wNDMJymsfiRdh8',
    secure: true

});

describe('Pruebas en fileUpload', () => { 
    test('Debe subir el archivo correctamente a cloudinary', async() => { 

        const imageUrl = 'https://images.freeimages.com/images/premium/previews/1606/16061541-portugal-knight-postage-stamp.jpg'

        const resp = await fetch( imageUrl );
        const blob = await resp.blob();
        const file = new File([blob], 'foto.jpg');
        const url = await fileUpload( file );

        expect( typeof url ).toBe('string'); // o "toExpectAnyString"

        // xofmjwjvagxugulinh7t.jpg

        //console.log('hola');
        const segments = url.split('/');
        const imageId = segments[ segments.length - 1].replace('.jpg', '');
        const cloudResp = await cloudinary.api.delete_resources(['journal/' + imageId], {
            resource_type: 'image'
        });
        //console.log({cloudResp});

     });

     test('debe retornar null', async() => {
        const file = new File([], 'foto.jpg');
        const url = await fileUpload( file );
        expect( url ).toBe( null );
     })

 })