import axiosInstance from '../api/axios';

class MyCustomUploadAdapter {
    constructor(loader) {
        this.loader = loader;
    }

    upload() {
        return this.loader.file
            .then(file => new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => {
                    // const base64Data = reader.result.split(',')[1]; // Extract base64 data
                    const base64Data = reader.result;
                    const filename = file.name;
                    axiosInstance.post('/api/File', 
                        { 
                            "fileName": filename, 
                            "fileBase64": base64Data 
                        }, 
                        ).then(response => {
                                console.log(response);
                            resolve({
                                default: response.data.theFile.fileUrl // Assuming the server returns the uploaded file URL
                            });
                        })
                        .catch(error => {
                            console.error(error);
                        });
                };
            }));
    }

    abort() {
        // Handle aborting the upload
    }
}

export default function MyCustomUploadAdapterPlugin(editor) {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
        return new MyCustomUploadAdapter(loader);
    };
}


