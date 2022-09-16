export const fileUpload = async( file ) => {
    if( !file ) throw new Error('No tenemos ningun archivo a subir');
    const cloudUrl = 'https://api.cloudinary.com/v1_1/piazzolla/upload';
    const formData = new FormData();
    formData.append('upload_preset', 'react-journal');
    formData.append('file', file);
    try {
        const resp = await fetch( cloudUrl, {
            method: 'POST',
            body: formData
        });

        if( !resp.ok ) throw new Error('No se pudo subir la imagen');

        const cloudResp = await resp.json();
        return cloudResp.secure_url;

    } catch (error) {
        throw new Error( error.message );
    }
}