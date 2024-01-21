import { Dispatch, SetStateAction } from 'react';
import Resizer from "react-image-file-resizer";
import { useDropzone } from "react-dropzone";
import UploadImage from '../assets/Upload';
import TrashIcon from '../assets/TrashIcon';

type UploadProps = {
    setProfileImage: Dispatch<SetStateAction<{ url: string; name: string; }>>
    profileImage: { url: string; name: string; }
    label: string,
    isError?: boolean,
    errorMessage?: string
};

export default function Upload({ setProfileImage, label, isError, profileImage, errorMessage }: UploadProps) {
    const onDrop = async (acceptedFiles: File[]) => {
        const file = acceptedFiles[0];

        const resizeFile = (file: File) =>
            new Promise((resolve) => {
                Resizer.imageFileResizer(
                    file,
                    500,
                    500,
                    "JPEG",
                    100,
                    0,
                    (uri) => {
                        resolve(uri);
                    },
                    "base64"
                );
            });

        const fileCrypted = await resizeFile(file);

        setTimeout(() => {
            setProfileImage({
                url: fileCrypted as string,
                name: acceptedFiles[0].name
            })
        }, 500);
    };

    const dropzone = useDropzone({
        onDrop,
    });

    return (
        <div className="w-1/2 flex flex-col gap-1 max-lg:w-11/12">
            <label className="flex items-start" htmlFor="upload">
                {label}
            </label>
            <div className="w-full flex flex-col">
                <div className="flex flex-col gap-4 w-full">
                    {
                        profileImage.url.length <= 0 ? (
                            <div {...dropzone.getRootProps()} className={`border-[#D3E2E5] border-[1px] rounded-[6px] bg-[#3a3a3a] h-[120px] ${isError && "border-red-500"}`}>
                                <label htmlFor="dropzone-file" className="cursor-pointer w-full h-full">
                                    <div className="w-full h-full flex flex-col justify-center items-center">
                                        <UploadImage className="h-8 w-8 mb-2 fill-black" />
                                        <span className="font-bold text-white font-nunito mb-2">Arraste e solte o arquivo</span>
                                    </div>
                                </label>
                                <input {...dropzone.getInputProps()} className="hidden" />
                            </div>) : (
                            <div className="relative">
                                <label htmlFor="dropzone-file" className="cursor-pointer w-full h-full">
                                    <div className="w-full h-full flex flex-col justify-center items-center">
                                        <img src={profileImage.url} alt="profile" className='h-[200px] rounded-[6px] w-full border-white border' />
                                    </div>
                                </label>
                                <div className='absolute top-2 right-2'>
                                    <button onClick={() => setProfileImage({ url: "", name: "" })}>
                                        <TrashIcon className="h-8 w-8 mb-2 fill-inherit hover:fill-red-600" />
                                    </button>
                                </div>
                            </div>
                        )}
                </div>
                {isError && <p className="text-red-500 mt-1 text-sm flex justify-end">{errorMessage}</p>}
            </div>
        </div>
    )
}