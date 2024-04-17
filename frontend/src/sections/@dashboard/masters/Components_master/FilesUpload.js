import React, { useState, useRef } from 'react';
import {Box, Icon,ListItemText, Grid, styled, Stack,Button, IconButton} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { fData } from '../../../../utils/formatNumber';
import {IconConfig} from './IconConfig';

const FileInputBox = styled(Box)(({theme})=>({
    padding: '10px',
    outline: 'none',
    borderRadius: '8px',
    textAlign: 'center',
    cursor: 'pointer',
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: 'rgba(145, 158, 171, 0.08)',
    border: '1px dashed rgba(145, 158, 171, 0.2)',
    transition: 'opacity 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, padding 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    "&:hover": {
      opacity: '0.6',
    },
  }));

export default function FilesUpload (props) {

    const { files, setFiles} = props;
    const fileInputRef = useRef(null);
   
    const handleFileChange = (event) => {
      const selectedFiles = event.target.files;
      console.log(event.target.files);
      setFiles((prevFiles) => [...prevFiles, ...Array.from(selectedFiles)]);

          // Create a new file input element
    const newFileInput = document.createElement('input');
    newFileInput.type = 'file';
    newFileInput.accept = '.pdf, .doc, .docx, .jpg, .jpeg';
    newFileInput.multiple = true;
    newFileInput.style.cssText = "display:none;";
    newFileInput.addEventListener('change', handleFileChange);

    // Replace the existing file input with the new one
    const currentFileInput = fileInputRef.current;
    currentFileInput.parentNode.replaceChild(newFileInput, currentFileInput);
    fileInputRef.current = newFileInput;
    };
  
    const handleDrop = (event) => {
      event.preventDefault();
      const selectedFiles = event.dataTransfer.files;
      setFiles((prevFiles) => [...prevFiles, ...Array.from(selectedFiles)]);
    };
  
    const preventDefault = (event) => {
      event.preventDefault();
    };
  
    const handleClick = () => {
      fileInputRef.current.click();
    };
  
    const removeFile = (index) => {
      setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    };

  return (
    <Box>
    <FileInputBox
      tabIndex="0"
      role="presentation"
      onDragOver={preventDefault}
      onDragEnter={preventDefault}
      onDrop={handleDrop}
      onClick={handleClick}
    >      
    <input
    type="file"
    accept='.pdf, .doc, .docx, .jpg, .jpeg'
    style={{ display: 'none' }}
    onChange={handleFileChange}
    multiple
    ref={fileInputRef}
  />
  <Stack direction={'column'} spacing={1}>
  <Box
            component="img"
            src="/assets/illustrations/file_upload.svg"
            sx={{ height: 100, mx:'auto' }}
          />
          <Stack direction={'column'} spacing={1}>
            <Typography variant='h6' display={'block'}>
              Drop or Select file
            </Typography>
            <Typography variant='body2' display={'block'}>
              Drop files here or click<Box component={'span'} mx={'4px'} sx={{textDecoration:'underline', color:'text.info'}} >browse</Box>thorough your machine
            </Typography>
          </Stack>
  </Stack>

    </FileInputBox>
    {files.length > 0 && (
        <Box flexGrow={1} my={1}>
        <Grid container spacing={2}>
            {files.map((file,index)=>(
                <Grid key={index} item xs={6} md={4}>
                        <Stack spacing={1} alignItems="center" direction={'row'}>
                            <Box
                                component="img"
                                src={IconConfig[file.type.split('/')[1]] || IconConfig['default']}
                            alt='icon'
                            />
                            <ListItemText primary={file.name} secondary={fData(file.size)}/>
                            <IconButton size="small" onClick={() => removeFile(index)}>
                                <CloseIcon fontSize="small"/>
                            </IconButton>
                        </Stack>
                </Grid>
            ))}
        </Grid>
        </Box>
        // <div>
        //   <Typography variant="subtitle2" color="textSecondary" sx={{ mt: 1 }}>
        //     Selected Files:
        //   </Typography>
        //   <ul>
        //     {files.map((file, index) => (
        //       <li key={index}>
        //                   <Box
        //     component="img"
        //     src={IconConfig[file.type.split('/')[1]] || IconConfig['default']}
        //     alt='icon'
        //   />
        //   {file.name}{' '}{fData(file.size)}
        //         <span style={{ cursor: 'pointer', color: 'blue' }} onClick={() => removeFile(index)}>
        //           (Remove)
        //         </span>
        //       </li>
        //     ))}
        //   </ul>
        // </div>
      )}
    </Box>
  );
};
