import React, { memo, useState, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import {
  makeSelectLoading,
  makeSelectCurrentUser,
  makeSelectTaskStatuses,
  makeSelectCurrentUserRole,
} from 'containers/App/selectors';
import {
  makeSelectBridge,
  makeSelectBridgeSurveys,
  makeSelectBridgeTasks,
  makeSelectDisplayedSurvey,
  makeSelectFolderStructure,
  makeSelectImagesFolderStructure,
  makeSelectImagesPaths,
  makeSelectSurveyFiles,
  makeSelectSelectedTask,
  makeSelectPreviousTask,
  makeSelectNextTask,
  makeSelectPrimaryBridgeModel,
} from 'containers/BridgeModul/selectors';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import FolderContent from 'components/FolderContent/FolderContent';
import Timer from 'components/Timer/Timer';
import { apiUrl } from 'containers/App/constants';
import DateField from 'components/DateField/DateField';
import AnimatedComponent from 'components/AnimatedComponent/AnimatedComponent';
import { toggleAlert, toggleModal } from 'containers/App/actions';
import  FolderStructureTree from 'components/tree/FolderStructureTree'

import {
  uploadFile,
  downLoadFile,
  updateTask,
} from 'containers/AppData/actions';
import {
  rejectPreviousTask,
  createNewBridgeModel,
  setSharedState,
  editBridge,
  showInView,
  updateSurveyStatus,
} from 'containers/BridgeModul/actions';
import { setSelectedTab } from 'containers/BridgeModul/LeftViewComponent/actions';
import useEventSource from 'utils/customHooks/useEventSource';
import Gallery from 'components/Gallery/Gallery';
import {
  getFileExtension,
  getFileNameByString,
  splitStringToArray,
  recursiveSearch
} from 'utils/dataUtils';
import {
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBSwitch,
  MDBSimpleChart,
  MDBAnimation,
  MDBSpinner,
} from 'mdbreact';
import { convertToMySqlDateFormat } from 'utils/dateTimeUtils';
import IconButtonToolTip from 'components/IconButtonToolTip/IconButtonToolTip';
import Form from 'containers/Forms/Form';
import FilesStatuses from 'components/FilesStatuses/FilesStatuses';
import Header from './Header'
import Files from './Files';
import SubTask from './SubTask';
import './TaskWizard.css';

const key = 'taskWizard';

function TaskWizard({
  currentUser,
  currentUserRole,
  loading,
  statuses,
  surveyFiles,
  onUploadFile,
  onDownLoadFile,
  onToggleAlert,
  onToggleModal,
  task,
  onUpdateTask,
  folderStructure,
  imagesFolderStructure,
  previousTask,
  onCreateNewBridgeModel,
  onSetSharedState,
  nextTask,
  onEditBridge,
  bridge,
  onRejectPreviousTask,
  onShowInView,
  nodes,
  setLeftViewTab,
  primaryModel,
  displayedSurvey,
  onUpdateSurveyStatus,
  imagesPaths
}) {
  // console.log('task', task)
  // console.log('imagesFolderStructure', imagesFolderStructure)

  const createSubTasksArray = () => {
    const subTasksNames = splitStringToArray(task.sub_tasks_names, ',');
    const subTasksFileTypes = task.sub_tasks_file_types
      ? splitStringToArray(task.sub_tasks_file_types, ',')
      : [];
    const subTasksDates = task.sub_tasks_dates
      ? task.sub_tasks_dates.split(',')
      : subTasksNames.map(subTask => '');
    const subTasksRemarks = task.sub_tasks_remarks
      ? task.sub_tasks_remarks.split(',')
      : subTasksNames.map(subTask => '');
    const subTasks = subTasksNames.map((subTaskName, index) => ({
          name: subTaskName,
          fileType: subTasksFileTypes[index],
          completed: subTasksDates[index],
          remarks: subTasksRemarks[index],
        }),
    );
    return subTasks;
  };
  const cesiumTasksNames = ['Calibrate models', "Update elements"]
  let subTasks = task.sub_tasks_names ? createSubTasksArray() : []
  // let firstInCompletedTask = subTasks.find(subTask => !subTask.completed.length);
  // let firstWord = firstInCompletedTask ? firstInCompletedTask.name.split(' ')[0] : subTasks[0].name.split(' ')[0];
  const [files, setFiles] = useState([])
  const [filesInProgress, setFilesInProgress] = useState([])
  const [selectedFolder, setSelectedFolder] = useState();
  // const [mode, setMode] = useState(firstWord)
  const [mode, setMode] = useState()
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [galleryMode, setGalleryMode] = useState(false);
  // const [currentSubTask, setCurrentSubTask] = useState(firstInCompletedTask ? firstInCompletedTask : subTasks[0])
  const [currentSubTask, setCurrentSubTask] = useState()
  // const [remarks, setRemarks] = useState(task.remarks)
  const [filesStatus, setFilesStatus] = useState('initial')
  const [selectedFolders, setSelectedFolders] = useState([])
  const [updatingSubTask, setUpdatingSubTask] = useState()

  // const useSse = useEventSource()
  useEffect(() => {
    setUpdatingSubTask()
    setCurrentSubTask()
    setFilesInProgress([])
    task && axios.get(apiUrl + `logs/${task.survey_id}/${task.id}/Uploading`)
      .then(res => {
        const logs = res.data
        
        if (logs.length) {
          let updatedFilesInProgress = [...filesInProgress]
          logs.forEach(log => {
            const existingFile = updatedFilesInProgress.find(file => log.id == file.id)
            if (existingFile) {
              updatedFilesInProgress = updatedFilesInProgress.filter(file => file.id !== log.id)
              // updatedFilesInProgress.push(log)
            } else {
              updatedFilesInProgress.push(log)
            }
          })
          setFilesInProgress(updatedFilesInProgress)
          setFilesStatus('uploading')
        }
      })
    // console.log(surveyFiles)
    // subTasks = createSubTasksArray();
    // firstInCompletedTask = subTasks.find(subTask => !subTask.completed.length);
    // firstWord = firstInCompletedTask ? firstInCompletedTask.name.split(' ')[0] : subTasks[0].name.split(' ')[0];
    // setMode(firstWord);
    // setCurrentSubTask(firstInCompletedTask ? firstInCompletedTask : subTasks[0])
    // setSelectedFiles([]);
    // setSelectedFolder();
    // const folders = getFoldersByString(firstInCompletedTask ? firstInCompletedTask.fileType : subTasks[0].fileType);
    // setSelectedFolders(folders)
    return () => {
        
    }
  }, [task])

  useEffect(() => {
    // currentSubTask && axios.get(apiUrl + `logs/${task.survey_id}/${task.id}/${currentSubTask.name}`)
    currentSubTask && axios.get(apiUrl + `logs/${task.survey_id}/${task.id}/Uploading`)
            .then(res => {
              const logs = res.data
           
              if (logs.length) {
                let updatedFilesInProgress = [...filesInProgress]
                logs.forEach(log => {
                  const existingFile = updatedFilesInProgress.find(file => log.id == file.id)
                  if (existingFile) {
                    // console.log(existingFile)
                    updatedFilesInProgress = updatedFilesInProgress.filter(file => file.id !== existingFile.id)
                    // updatedFilesInProgress = []
                    // console.log(updatedFilesInProgress)
                    updatedFilesInProgress.push(log)
                  } else {
                    updatedFilesInProgress.push(log)
                  }
                })
                setFilesInProgress(updatedFilesInProgress)
              }
            })
    return () => {
      
    }
  }, [currentSubTask])
  const onDrop = acceptedFiles => {
    let allowedFiles = []
    let rejectedFiled = []
    let allreadySelectedFiles = []
    acceptedFiles.forEach(file => {
      const fileExtension = getFileExtension(file.name)
      // console.log(fileExtension)
      const isAllowed = selectedFolder.file_types.includes(fileExtension.toLowerCase()) || fileExtension == 'zip' 
      // console.log(isAllowed)
      // const allreadySelected = filesInProgress.find(f => f.name == file.name);
      const allreadySelected = false;
      // console.log(allreadySelected)

      // if (allreadySelected) {
      //   allreadySelectedFiles.push(file)
      // }
      if (!allreadySelected) {
        if (isAllowed) allowedFiles.push(file)
        else rejectedFiled.push(file)

      }
    })
    // if (allreadySelectedFiles.length) {
    //   const text = allreadySelectedFiles.length == 1 
    //       ? `${allreadySelectedFiles.map(
    //           file => file.name,
    //         )} is allready selected`
    //       : `${allreadySelectedFiles.map(
    //           file => file.name,
    //         )} are allready selected`;

    //   onToggleAlert({
    //     title: `Oops...`,
    //     text: text,
    //     confirmButton: 'Got it',
    //     // cancelButton: 'Cancel',
    //     alertType: 'danger',
    //     // confirmFunction: () => onToggleAlert()
    //   });
    // }
    if (rejectedFiled.length) {
      const text = rejectedFiled.length == 1 ?
        `${rejectedFiled.map(file => file.name)} file is from the wrong type, only ${selectedFolder.file_types} are accepted`
          : `${rejectedFiled.map(
              file => file.name,
            )} file are from the wrong type, only ${
              selectedFolder.file_types
            } are accepted`;
      onToggleAlert({
        title: `Wrong file type`,
        text: text,
        confirmButton: 'Got it',
        // cancelButton: 'Cancel',
        alertType: 'danger',
        // confirmFunction: () => onToggleAlert()
      });
    }

    const tasksThaCanUploadOneFile = ["Upload digital twin osg", "Upload 3D-Tiles", "Upload OSGB", 'Upload digital twin glb']
   
    if (acceptedFiles.length > 1 && tasksThaCanUploadOneFile.includes(currentSubTask.name)) {
      onToggleAlert({
        title: `Too many files`,
        text: `You tried uploading ${acceptedFiles.length} files. 
          ${currentSubTask.name} task require only one file`,
        confirmButton: 'Got it',
        // cancelButton: 'Cancel',
        alertType: 'danger',
        // confirmFunction: () => onToggleAlert()
      });
    } 
    // else if (tasksThaCanUploadOneFile.includes(currentSubTask.name) && surveyFiles.tiles.length > 0 && currentSubTask.name == 'Upload 3D-Tiles') {
    //   onToggleAlert({
    //     title: `Are you sure you want to upload a new tileset?`,
    //     text: `Uploading a new tileset will delete the existing one`,
    //     confirmButton: 'Yes',
    //     cancelButton: 'Cancel',
    //     alertType: 'danger',
    //     confirmFunction: () => {
    //       // onToggleAlert()
    //       const newFiles = [...files, ...allowedFiles]
    //       // console.log(newFiles)
    //       setFilesInProgress([...filesInProgress, ...newFiles])
    //       setFiles(newFiles)
    //     }
    //   });
    // }
      
    else{
      const newFiles = [...files, ...allowedFiles]
      // console.log(newFiles)
      // setFilesInProgress([...filesInProgress, ...newFiles])
      setFiles(newFiles)

    }
    // console.log(files)
  };

  // receives array of files that are done uploading when submit button is clicked
  const uploadFile = file => {
    console.log(file)
    const fileExtentension = getFileExtension(file.name);
    // const filesWithStatuses = [
    //   ...filesInProgress,
    // ];
    // filesWithStatuses.find(
    //   f => f.name === file.name,
    // ).status = 'Uploading';
    // setFilesInProgress(filesWithStatuses); 
    switch (fileExtentension) {
      case 'zip':
        return new Promise(async (resolve, reject) => {

          const filePath = `bid_${task.bid}/survey_${task.survey_id}/${selectedFolder.path}`;
         

          const formData = new FormData();
          formData.append('file', file);
          formData.append('taskId', task.id);
          formData.append('surveyId', task.survey_id);
          formData.append('bid', task.bid);
          formData.append('userId', currentUser.userInfo.id);
          formData.append('emails', [currentUser.userInfo.email]);
          formData.append('created_by', `${currentUser.userInfo.first_name  } ${  currentUser.userInfo.last_name}` );
          formData.append('bucketName', `3dbia_organization_${  task.organization_id}`);
          formData.append('filePath', filePath);
          // formData.append('organization_id', task.organization_id);
          formData.append('sub_task_name', currentSubTask.name);
          // console.log(currentSubTask.name)
          const folder_id = Date.now()
          formData.append('folder_id', folder_id)
          // if (currentSubTask.name !== 'Upload images') formData.append('folder_id', folder_id);
          switch (currentSubTask.name) {
            case 'Upload images':
              formData.append('msg', 'New images uploaded');
              break;
            case 'Upload 3D-Tiles':
              formData.append('msg', 'New Tileset uploaded');
              break;
            case 'Upload digital twin glb':
              formData.append('msg', 'New GLB model uploaded');
              break;
          
            default:
              break;
          }

          // create uploading log      
          const log = {
            bid: task.bid,
            type: 'zip',
            organization_id: task.organization_id,
            survey_id: task.survey_id,
            task_id: task.id,
            sub_task_name: currentSubTask.name,
            user_id: currentUser.userInfo.id,
            status: 'Uploading',
            name: file.name,
            path: filePath, 
            size: null
          }
          axios
          .post(
            apiUrl + 'logs',
            log,
          )
          .then(logResult => {
            console.log(logResult)
            const logId = logResult.data.insertId
            if (logId) {
              axios
                .post(
                  apiUrl + `cloud-upload/zip/${logId}/${folder_id}`,
                  formData,
                  {
                  timeout: 1000000,
                  },
                )
                .then(res => {
                  console.log(res);
                  if (res.status == 200) resolve(res);
                  else reject(res)
    
                  // const updatedFiles = [...filesWithStatuses];
                  // if (res.status == 200) {
                  //   resolve(res);
                  //   updatedFiles.find(
                  //     f => f.name === file.name,
                  //   ).status = 'Uploaded';
                  //   setFilesInProgress(updatedFiles);
                  //   handleUploadedFiles(res.data);
                  // } else {
                  //   updatedFiles.find(
                  //     f => f.name === file.name,
                  //   ).status = 'Error';
                  //   setFilesInProgress(updatedFiles);
                  //   reject(res);
                  // }
                });

            }
          })
        });
      // case 'csv':
      //   return new Promise(async (resolve, reject) => {
      //     const fileName = `bid_${task.bid}/survey_${
      //       task.survey_id
      //     }/${file.name}`;
      //     const formData = new FormData();
      //     formData.append('file', file);
      //     formData.append('bucketName', `3dbia_organization_${task.organization_id}`,
      //     );
      //     formData.append('fileName', fileName);
      //     formData.append('surveyId', task.survey_id);
      //     formData.append('taskId', task.id);
      //     formData.append('bid', task.bid);
      //     formData.append('userId', currentUser.userInfo.id);   
      //     const log = {
      //       bid: task.bid,
      //       type: 'csv',
      //       organization_id: task.organization_id,
      //       survey_id: task.survey_id,
      //       task_id: task.id,
      //       sub_task_name: currentSubTask.name,
      //       user_id: currentUser.userInfo.id,
      //       status: 'Uploading',
      //       name: file.name,
      //       path: '', 
      //       size: null
      //     }
      //     axios
      //     .post(
      //       apiUrl + 'logs',
      //       log,
      //     )
      //     .then(logResult => {
      //       console.log(logResult)
  
      //     })

      //   })
      default:
        return new Promise(async (resolve, reject) => {
          console.log(file.name)
          let fileName
          if (file.name == 'folder_structure.csv') fileName = `bid_${task.bid}/survey_${task.survey_id}/${file.name}`; 
          else fileName = `bid_${task.bid}/survey_${task.survey_id}/${selectedFolder.path}/${file.name}`;
           
          // console.log(fileName)
          const smallFileName = `${fileName.split('.')[0]  }_small_image.${  fileName.split('.')[1]}`;
          // const smallFileName = 'small_image_' + fileName
          // console.log(smallFileName)
          const formData = new FormData();
          formData.append('file', file);
          formData.append('bucketName', `3dbia_organization_${task.organization_id}`,
          );
          formData.append('fileName', fileName);
          formData.append('smallFileName', smallFileName);
          formData.append('surveyId', task.survey_id);
          formData.append('taskId', task.id);
          formData.append('bid', task.bid);
          formData.append('userId', currentUser.userInfo.id);   
          axios.post(
              apiUrl + 'cloud-upload',
              formData,
              {
              timeout: 1000000,
              },
            )
            .then(res => {
              console.log(res);
              let updatedFiles = [...filesWithStatuses];
              if (res.status == 200) {
                resolve(res);
                updatedFiles.find(
                  f => f.name === file.name,
                ).status = 'Uploaded';
                setFilesInProgress(updatedFiles);
                handleUploadedFiles(res.data);
              } else {
                updatedFiles.find(
                  f => f.name === file.name,
                ).status = 'Error';
                setFilesInProgress(updatedFiles);
                reject(res);
              }
            });
        });
    }
  };


  const uploadFiles = async () => {
    // console.log(filesInProgress)
    // console.log(files)
    const status = await Promise.all(files.map(file => uploadFile(file)))
    console.log("Status =>", status)
    
    setFiles([])
    // setFilesInProgress([])
      
  }
  const handleSubmit = () => {
    setFilesStatus('uploading');


    // console.log(files)
    uploadFiles()
  }
  const handleUploadedFiles = (uploadedFile) => {
    // console.log(uploadedFile)
    // console.log(currentSubTask)
    switch (currentSubTask.name) {
      case 'Upload digital twin glb':

        const newBridgeModel = prepareNewBridgeModel(uploadedFile, 'cad');

        onCreateNewBridgeModel(newBridgeModel)
        // onEditBridge(updatedBridge)
        break;
      case 'Upload 3D-Tiles':
        // const newBridgeTileSet = prepareNewBridgeModel(uploadedFile, 'model');
        // onCreateNewBridgeModel(newBridgeTileSet)
        break;

      default:
        break;
    }
  }

  const prepareNewBridgeModel = (uploadedFile, type) => {
    console.log(uploadedFile)
    // console.log(currentUser)
    let newBridgeModel = {
      name: uploadedFile.fileUrl.split('/')[uploadedFile.fileUrl.split('/').length-1],
      task_id: task.id,
      survey_id: task.survey_id,
      bid: task.bid,
      created_by: `${currentUser.userInfo.first_name  } ${  currentUser.userInfo.last_name}`,
      type: type,
      url: uploadedFile.fileUrl,
      isNew: true,
      calibration_data: primaryModel ? primaryModel.calibration_data : null,
      folder_id: null
    }
    return newBridgeModel
      
  }
  const handleFileCheckbox = (file) => {
    if (selectedFiles.includes(file)) {
      setSelectedFiles(selectedFiles.filter(f => f !==file)) 
    } else {
      setSelectedFiles([...selectedFiles, file])
    }
  }

  const handleDownload = () => {
    console.log(selectedFiles)
    let index = 0
    setInterval(function(){
      if (selectedFiles.length > index) {
        download(selectedFiles[index].name, selectedFiles[index].fullImageLink);
        index++
      }
    }, 250);
    // selectedFiles.forEach(file => {
    //   download(file.name, file.fullImageLink)
    // })
  }
  const download = (fileName, fileLink) => {
    const element = document.createElement('a');
    element.setAttribute('href', fileLink);
    element.setAttribute('download', fileName);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }


  const handleFolderClick = (newFolder) => {
    console.log(newFolder)
    console.log(folderStructure)
    console.log(currentSubTask)
    if (currentSubTask.name == 'Upload images') {
      const folderPath = 'Images/' + imagesPaths.find(path => path.split('/')[path.split('/').length-2] == newFolder)
      newFolder = {
        // name: newFolder,
        path: folderPath,
        file_types: ['jpg', 'jpeg']
      }

    }
    
    if (selectedFolder !== newFolder) {
      setSelectedFolder(newFolder);
      // setAllowedFileTypes(newFolder.file_types);
      setFiles([]);
      setSelectedFiles([])
    } 
  }

  const handleFolderCheckbox = (folder) => {
    // console.log(folder);
    if (selectedFolders.includes(folder)) {
      setSelectedFolders(selectedFolders.filter(f => f !== folder)) 
    } else {
      setSelectedFolders([...selectedFolders, folder])
    }
  }

  const toggleFolderCheckboxAll = () => {
    console.log(currentSubTask.fileType)
    const folders = getFoldersByString(currentSubTask.fileType);
    console.log(folders)
    console.log(selectedFolders)
    selectedFolders.length == folders.length
      ? setSelectedFolders([])
      : setSelectedFolders(folders)
  };
  const showFolderContent = (folder) => {
    console.log(folder)
    // let folderName = folder.path.split('/')[folder.path.split('/').length-1]
    // console.log(folderName)
    let body
    switch (folder.name) {
      case 'Glb':
        const glbModels = getFileNameByString(folder.name, surveyFiles.glbModels);
        body = <FolderContent
            files={glbModels}
            isImages={false}
            selectedFolder={folder.name}
            allowDownload={false}
        />
        
        break;
      case 'Scene':
        const tiles = getFileNameByString(folder.name, surveyFiles.tiles);
        body = <FolderContent
          files={tiles}
            isImages={false}
            selectedFolder={folder.name}
            allowDownload={false}
        />
        
        break;

      default:
        const images = getFileNameByString(folder.name, surveyFiles.images)
        body = <FolderContent
          files={images}
          isImages
          selectedFolder={folder.name}
          allowDownload={false}
        />
    }
 
    onToggleModal({
      title: folder.path,
      text:``,
      cancelButton: 'Close',
      body: body
    });
  };
  const FolderRow = ({folder}) => {
    const path = folder.path.split('/');
    console.log(path)
    let filesLength 
    let folderName = folder.path.split('/')[folder.path.split('/').length-1]
    console.log(folderName)
    switch (folderName) {
      case 'Glb':
        filesLength = getFileNameByString(folderName, surveyFiles.glbModels).length
        break
      case 'Scene':
        filesLength = getFileNameByString(folderName, surveyFiles.tiles).length
        break
      default:
        filesLength = getFileNameByString(folderName, surveyFiles.images).length
        break
    }
    // console.log(filesLength)
    return (
      <div className="my-1 d-flex justify-content-between">
        <div className="cursor-pointer">
          <div
            
            className={ 
              selectedFolder && folder == selectedFolder
                ? 'bold'
                : 'faded'
            }
            onClick={() => handleFolderClick(folder)}
          >
            {`${path[path.length - 2]} (${filesLength})`}
          </div>
        </div>
        <div className="d-flex mr-2">
          {filesLength > 0 && <MDBIcon
            icon="eye"
            size="sm"
            className="mr-2 cursor-pointer"
            onClick={() => showFolderContent(folder)}
            far
          />
          }
          {mode == 'Download' && (
            <MDBIcon
              icon={
                selectedFolders.includes(folder)
                  ? 'check-square'
                  : 'square'
              }
              size="sm"
              className="cursor-pointer"
              onClick={() => handleFolderCheckbox(folder)}
              far
            />
          )}
        </div>
      </div>
    );
  };

  const getFoldersByString = (string) => {

    return folderStructure.filter(folder => folder.path.includes(string))

  }


  const allSubTasksComplete = () => {
    let complete = true
    subTasks.forEach(subTask => {
      if (!subTask.completed) complete = false
    })
    return complete
  }
  const taskCompletedPercentage = () => {
    let completed = []
    subTasks.forEach(subTask => {
      if (subTask.completed) completed.push(subTask)
    })
    return Math.floor(completed.length/subTasks.length*100)
  }

  const handleSubTaskClick = (subTask) => {
    console.log(subTask)
    setCurrentSubTask(subTask)
    const firstWord = subTask.name.split(' ')[0];
    setMode(firstWord)
    setSelectedFolder()
    onSetSharedState('selectedSubTask', subTask)
    if (cesiumTasksNames.includes(subTask.name)) {
      onShowInView('main', 'Resium')
    }
    switch (subTask.name) {
      case 'Update elements':
        setLeftViewTab('Spans')
        break;
      case 'Create folder_structure.csv file':
        // setLeftViewTab('Spans')
        break;
      case 'Upload folder_structure.csv file':
        setSelectedFolder({
          path: null,
          file_types: ['csv']
        })
        break;
      case 'Calibrate models':
        onShowInView('leftView', 'calibration')
      default:
        break;
    }
  }
  const updateTaskRemarks = (remarks) => {
    const taskToUpdate = {...task};
    taskToUpdate.remarks = remarks;
    onUpdateTask(taskToUpdate)

    // if (rejectPreviousTaskCheckbox && previousTask) {
    //   onToggleAlert({
    //     title: `Reject previous task`,
    //     text: `Are you sure you want to set previous task '${previousTask.name}' to 'Open'`,
    //     confirmButton: 'Reject',
    //     cancelButton: 'Cancel',
    //     alertType: 'danger',
    //     confirmFunction: () => {
    //       const updatedPreviousTask = {...previousTask};
    //       updatedPreviousTask.status = 'Open';
    //       onUpdateTask(updatedPreviousTask);
    //       onUpdateTask(taskToUpdate)
    //     }
    //   });

    // } else {
    //   onUpdateTask(taskToUpdate)

    // }
  };

  const rejectPreviousTask = () => {
    onToggleModal({
      title:`Reject previous task`,
      text:`Are you sure you want to set previous task '${previousTask.name}' to 'Open'`,
      // confirmButton: 'Create',
      cancelButton: 'Cancel',
      formType: 'taskRejectionForm',
      data: {
        editMode: 'Yes',
        colWidth: 6,
      },
      confirmFunction: (data) => {
        const updatedPreviousTask = {
          ...previousTask,
        };
        updatedPreviousTask.status = 'Open';
        onUpdateTask(updatedPreviousTask);
        onUpdateTask(taskToUpdate);
      }});

  };
 

  const completeTask = () => {
    // check if prior task status is complete, if not, alert "last task is not completed"
    console.log(previousTask)
    if (previousTask && previousTask.status !== 'Complete') {
      onToggleAlert({
        title: `Previous task is not completed`,
        text: `Yopu cant complete current task when previous task is not completed`,
        confirmButton: 'Got it',
        // cancelButton: 'Got it',
        alertType: 'danger',
        // confirmFunction: () => {
        //   const taskToUpdate = {...task};
        //   taskToUpdate.status = 'Complete';
        //   onUpdateTask(taskToUpdate)
        // }
      });
    } else {
      // change task status to complete

      onToggleAlert({
        title: `Complete task`,
        text: `Are you sure you want to set this task '${task.name}' to 'Complete'`,
        confirmButton: 'Yes',
        cancelButton: 'Cancel',
        alertType: 'success',
        confirmFunction: () => {
          const taskToUpdate = {...task};
          taskToUpdate.status = 'Complete';
          onUpdateTask(taskToUpdate)
        }
      });

    }
    //
  }

  const removeFile = selectedFile => {
    setFiles(files.filter(f => f.name !== selectedFile.name))
    setFilesInProgress(filesInProgress.filter(f => f.name !== selectedFile.name))
  }
  const prepareUpdateSubTask = (subTask, index) => {
    console.log(displayedSurvey)
    console.log(task)
    // console.log(subTask)
    setUpdatingSubTask(subTask.name)
    const subTasksDates = task.sub_tasks_dates ? task.sub_tasks_dates.split(',') : task.sub_tasks_names.split(',').map(subTask => '')
    const d = new Date;
    const day = d.getDate();
    const month = d.getMonth()+1;
    const year = d.getFullYear();
    const dateFormat = `${day }-${ month }-${ year}`
    if (!subTask.completed.length) subTask.completed = dateFormat
    else subTask.completed = ''
    const taskToUpdate = {...task}
    taskToUpdate.sub_tasks_dates = subTasksDates
    taskToUpdate.sub_tasks_dates[index] = subTask.completed
    taskToUpdate.sub_tasks_dates = taskToUpdate.sub_tasks_dates.join(',')
    // taskToUpdate.completed = taskCompletedPercentage()
    const firstInCompletedTask = subTasks.find(subTask => !subTask.completed.length);
    // if (!firstInCompletedTask) taskToUpdate.status = 'Complete'
    if (firstInCompletedTask && firstInCompletedTask !== subTasks[0]) taskToUpdate.status = 'Open'
    if (firstInCompletedTask && firstInCompletedTask == subTasks[0]) taskToUpdate.status = 'Allocated'
    // console.log(taskToUpdate)

    const firstWord = firstInCompletedTask ? firstInCompletedTask.name.split(' ')[0] : subTasks[0].name.split(' ')[0];
    setMode(firstWord);
    setCurrentSubTask(firstInCompletedTask || subTasks[0])
    setSelectedFiles([]);
    setSelectedFolder();

    const folders = getFoldersByString(firstInCompletedTask ? firstInCompletedTask.fileType : subTasks[0].fileType);
    setSelectedFolders(folders)
    // console.log('taskCompletedPercentage', taskCompletedPercentage())
    taskToUpdate.completed = taskCompletedPercentage()
    onUpdateTask(taskToUpdate, true)
    if ((displayedSurvey.status == 'Assigned' || displayedSurvey.status == 'Allocating') && subTask.completed.length) {
      onUpdateSurveyStatus('Open', displayedSurvey.id)
    } 
    const taskPosition = displayedSurvey.children.map(function(e) { return e.name; }).indexOf(task.name);
    console.log(taskPosition)
    if (taskPosition == displayedSurvey.children.length - 1) {
      if (subTask.completed.length) onUpdateSurveyStatus('Complete', displayedSurvey.id)
      else onUpdateSurveyStatus('Open', displayedSurvey.id)
    }
    // updateSurvey(taskToUpdate, subTask)
  };

  const updateSurvey = (task, subTask) => {
    console.log(task, subTask)
    if (displayedSurvey.status == 'Assigned') {
      onUpdateSurveyStatus('Open', displayedSurvey.id)
    } 
    // else if ()
  }
  const removeFileFromFilesInProgress = (file) => {
    setFilesInProgress(filesInProgress.filter(f => f !== file))
  }

  const folderTree = useMemo(() => imagesFolderStructure && <FolderStructureTree
        className="fontSmall"
        data={imagesFolderStructure}
        accordionMode={false}
        onClick={value => handleFolderClick(value)} 
        handleFolderClick={value => handleFolderClick(value)}
        showFolderContent={(folder) => showFolderContent(folder)}
        handleFolderCheckbox={(folder) => handleFolderCheckbox(folder)}   
        selectedFolders={selectedFolders} 
        mode={mode}          
      />, [imagesFolderStructure, currentSubTask])
  const folders = useMemo(() => {
    if (currentSubTask) {

  
      const folders = getFoldersByString(currentSubTask.fileType);
      console.log('folders', folders)
      if (currentSubTask.name == 'Upload images' || currentSubTask.name == 'Download images') {
        return (
          <>
            <div className="text-center bold">
              Select destination folder
            </div>
            {folderTree}
          </>
        );
      }
      if (folders.length == 1) {
        // console.log(folders[0])
        setSelectedFolder(folders[0])
        return <>
          <div className="bold text-center">
            Please upload {currentSubTask.fileType} 
          </div>
          <FolderRow folder={folders[0]} />
        </>;
      } else {
        return (
          <>
            <div className="row no-gutters align-items-center">
              <div className="col-2">

              </div>
              <div className="col-8 bold">
                Select destination folder
              </div>
              <div className="col-1">
                {selectedFolders.length && mode == 'Download'? (
                  // <MDBIcon icon="download" className="ml-2 color-orange" onClick={() => console.log('Download')}/>
                  <IconButtonToolTip
                    iconName="download"
                    toolTipType="info"
                    toolTipPosition="top"
                    toolTipEffect="float"
                    toolTipText="Download selected folders"
                    className="color-orange"
                    onClickFunction={() => console.log('Download')}
                  />
                ) : (
                  ''
                )}
              </div>
              <div className="col-1 text-center">
                {mode == 'Download' && <MDBIcon
                  icon={
                    selectedFolders.length == folders.length
                      ? 'check-square'
                      : 'square'
                  }
                  size={'lg'}
                  className=" mt-1 cursor-pointer"
                  onClick={() => toggleFolderCheckboxAll()}
                  far
                />}
              
              </div>

            </div>
            {}
            {folders.map(folder => (
              <FolderRow key={folder.path} folder={folder} />
            ))}
            {/* {selectedFolders.length ? 
            <div className="text-center mt-2">
               <MDBBtn
               className=""
               color={`primary`}
               size="sm"
               rounded
               // disabled={task.remarks == remarks}
               //  disabled={!allSubTasksComplete()}
               //  className={`${!allSubTasksComplete() && 'disabled faded'}`}
               onClick={() => console.log('Download')}
             >
               Download ({selectedFolders.length})
               <MDBIcon icon="download" className="ml-2" />
             </MDBBtn>

            </div>
            : ''} */}
          </>
        );
      }
     

    }
  }, [currentSubTask, selectedFolder, selectedFolders])


  const scrollContainerStyle = {
    // width: "100%", 
   //  maxHeight: `calc(100vh)-${theme.layout.topBarSize}`, 
    maxHeight: `35vh`, 
    overFlowY: 'auto',
    // overFlowX: 'hidden'
   }; 

  const SubTasks = () => {

    return (
      <>
        <div className="text-center">
          <span className="mr-3 bold">Tasks</span>
          <MDBSimpleChart
            strokeColor={taskCompletedPercentage() == 100 ? 'green' : 'red'}
            strokeWidth={3}
            width={30}
            height={30}
            percent={taskCompletedPercentage()}
            labelFontWeight="normal"
            labelFontSize="9"
            labelColor={taskCompletedPercentage() !== 100 ? 'red' : 'green'}

            // railColor={'blue'}
          />
        </div>

        {subTasks.map((subTask, index) => (
          <SubTask
            key={subTask.name}
            task={subTask}
            index={index}
            currentSubTask={currentSubTask}
            handleSubTaskClick={task => handleSubTaskClick(task)}
            isUpdating={updatingSubTask == subTask.name}
            prepareUpdateSubTask={(task, index) =>
              prepareUpdateSubTask(task, index)
            }
          />
        ))}
        <div className="bottom text-center fullWidth">
          <MDBBtn
            className="bgError"
            size="sm"
            rounded
            disabled={
              !previousTask ||
              (previousTask && previousTask.status !== 'Complete')
            }
            onClick={() => rejectPreviousTask()}
          >
            Reject previous
            <MDBIcon icon="exclamation-triangle" className="ml-2" />
          </MDBBtn>
          <MDBBtn
            // color={`${
            //   !allSubTasksComplete() ? 'light' : 'success'
            // }`}
            className="bgSecondary"
            size="sm"
            rounded
            disabled={!allSubTasksComplete()}
            //  className={`${!allSubTasksComplete() && 'disabled faded'}`}
            onClick={() => completeTask()}
          >
            complete
            <MDBIcon icon="check" className="ml-2" />
          </MDBBtn>
        </div>
      </>
    );
  }

  const Remarks = () => {
    const [remarks, setRemarks] = useState(task.remarks)
    return (
      <>
        <div className="text-center">
          <span className="mr-3 bold">Remarks</span>
        </div>
        <textarea
          className="taskWizardRemarks fullWidth p-1 mt-1"
          type="textarea"
          label="Remarks"
          value={remarks}
          onChange={e => setRemarks(e.target.value)}
        />
        <div className="d-flex justify-content-between align-items-center">
          {/* <MDBInput
              id="rejectPreviousTaskCheckbox"
              className=""
              containerClass="pl-1"
              type="checkbox"
              label="Reject previous task"
              labelClass="pl-4"
              onChange={e => setRejectPreviousTaskCheckbox(!rejectPreviousTaskCheckbox)}
              value={rejectPreviousTaskCheckbox}
            /> */}
          <div className="bottom mb-2">
            {/* {console.log(task)}
                  {console.log(previousTask)} */}

            <MDBBtn
              className="bgSecondary"
              // color={`success`}

              size="sm"
              rounded
              disabled={task.remarks == remarks}
              //  disabled={!allSubTasksComplete()}
              //  className={`${!allSubTasksComplete() && 'disabled faded'}`}
              onClick={() => updateTaskRemarks(remarks)}
            >
              Save
              <MDBIcon icon="save" className="ml-2" />
            </MDBBtn>
          </div>
        </div>
      </>
    );
 
  }

  const DropZone = () => {
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop,
    });
    return (
      <div
        className={`p-1 taskWizardDropZone position-relative ${selectedFolder &&
          'bgPrimaryFaded2'}`}
      >
        {mode == 'Upload' && selectedFolder && (
          <>
            <div
              {...getRootProps()}
              className={`cursor-pointer hoverBgPrimaryFaded3 p-2 fullHeight position-relative ${
                isDragActive ? 'bgPrimaryFaded3' : 'bgPrimaryFaded1'
              }`}
            >
              <input {...getInputProps()} />
              {isDragActive ? (
                <p>Drop the files here ...</p>
              ) : (
                <MDBAnimation
                  className=""
                  type="fadeIn"
                  // infinite={true}
                  // duration={'2s'}
                >
                  <p>
                    Drag 'n' drop files of type
                    {` ${selectedFolder.file_types}`}, or click to select
                    files
                  </p>
                </MDBAnimation>
              )}
            </div>
            {selectedFolder && !files.length && (
              <MDBAnimation
                className="absCenter"
                type="bounce"
                infinite
                duration="2s"
              >
                <div className="text-center">
                  <MDBIcon icon="upload" />
                  <div>UPLOAD FILES</div>
                </div>
              </MDBAnimation>
            )}

          </>
        )}
        {mode == 'Download' && (
          <div>
            {selectedFolder && (
              <>
                <MDBSwitch
                  className="fontSmall"
                  checked={galleryMode}
                  onChange={() => setGalleryMode(!galleryMode)}
                  labelLeft=""
                  labelRight={`Display as ${
                    galleryMode ? 'images' : 'table'
                  }`}
                />
                {galleryMode ? (
                  <Gallery
                    images={getFileNameByString(
                      selectedFolder.path.split('/')[
                        selectedFolder.path.split('/').length - 1
                      ],
                      surveyFiles.images,
                    )}
                    onClick={file => console.log(file)}
                    checkBoxMode={false}
                  />
                ) : (
                  getFileNameByString(
                    selectedFolder.path.split('/')[
                      selectedFolder.path.split('/').length - 1
                    ],
                    [...surveyFiles.images, ...surveyFiles.glbModels],
                  ).map(file => (
                    <div className="d-flex" key={file.name}>
                      <MDBInput
                        id={file.name}
                        type="checkbox"
                        label={file.fullImageName.split('/')[4]}
                        onChange={() => handleFileCheckbox(file)}
                      />
                    </div>
                  ))
                )}
              </>
            )}
          </div>
        )}
        {/* {mode == 'Update' && (
        <Form
          formType="surveyForm"
          editMode="edit"
          colWidth={4}
          // item={item}
          editFunction={formData => {
            console.log(formData);
          }}
        />
      )} */}
      </div>
    );
  }

  const FilesSection = () => {

    return (
      <MDBAnimation
        className=""
        type="fadeIn"
        // infinite={true}
        // duration={'2s'}
      >
        {files.length && mode == 'Upload' ? (
          <Files
            files={files}
            removeFile={selectedFile => removeFile(selectedFile)}
          />
        ) : (
          ''
        )}
        {files.length ? (
          <MDBBtn
            color="success"
            size="lg"
            rounded
            className="taskFileUploadButton"
            onClick={() => handleSubmit()}
          >
            Upload ({files.length})
            <MDBIcon icon="upload" className="ml-2" />
          </MDBBtn>
        ) : (
          ''
        )}
        {selectedFiles.length ? (
          <MDBBtn
            color="success"
            size="lg"
            rounded
            className="taskFileUploadButton"
            onClick={() => handleDownload()}
          >
            Download ({selectedFiles.length})
            <MDBIcon icon="download" className="ml-2" />
          </MDBBtn>
        ) : (
          ''
        )}
      </MDBAnimation>
    );
  }

  return (
    <MDBAnimation type="fadeIn">
      <div className="taskWizard bgPrimaryFaded1">
        <Header task={task} statuses={statuses}/>
        {/* <Layout2 /> */}
        <div className="row no-gutters taskWizardSubTasksSection">
          <div
              className={`col-4 p-2 border-right-thick ${!currentSubTask && 'bgPrimaryFaded2'}`}
            >
            <SubTasks />
          </div>
          <div
            style={scrollContainerStyle}
            className={`col-4 p-2 border-right-thick scrollbar scrollbar-primary fontSmall ${!selectedFolder &&
              currentSubTask &&
              'bgPrimaryFaded2'}`}
          >
            {currentSubTask && folders}
          </div>
          <div className="col-4 p-2">
            <Remarks />
          </div>
        </div>
        <DropZone />
        <FilesSection />
        {filesInProgress.length && filesStatus == 'uploading' ? (
        
          <FilesStatuses
            files={filesInProgress}
            removeFile={file => removeFileFromFilesInProgress(file)}
            close={() => setFilesStatus('')}
          />
        ) : (
          '' 
        )}
      </div>
    </MDBAnimation>
  );
}

const mapStateToProps = createStructuredSelector({
  currentUser: makeSelectCurrentUser(),
  currentUserRole: makeSelectCurrentUserRole(),
  loading: makeSelectLoading(),
  statuses: makeSelectTaskStatuses(),
  task: makeSelectSelectedTask(),
  previousTask: makeSelectPreviousTask(),
  nextTask: makeSelectNextTask(),
  surveyFiles: makeSelectSurveyFiles(),
  folderStructure: makeSelectFolderStructure(),
  imagesFolderStructure: makeSelectImagesFolderStructure(),
  imagesPaths: makeSelectImagesPaths(),
  bridge: makeSelectBridge(),
  primaryModel: makeSelectPrimaryBridgeModel(),
  displayedSurvey: makeSelectDisplayedSurvey(),
  // nodes: makeSelectModelNodes()
});

const mapDispatchToProps = dispatch => ({
    onToggleAlert: alertData => dispatch(toggleAlert(alertData)),
    onToggleModal: modalData => dispatch(toggleModal(modalData)),
    // onUploadFile: (fileType, bucketName, file) => dispatch(uploadFile(fileType, bucketName, file)),
    onDownLoadFile: (bucketName, fileName) => dispatch(downLoadFile(bucketName, fileName)),
    onUpdateTask: (task, dontShowToast) => dispatch(updateTask(task, dontShowToast)),
    onRejectPreviousTask: (task) => dispatch(rejectPreviousTask(task)),
    onCreateNewBridgeModel: (model) => dispatch(createNewBridgeModel(model)),
    onSetSharedState: (key, value) => dispatch(setSharedState(key, value)),
    onShowInView: (view, componentName, mode, id) => dispatch(showInView(view, componentName, mode, id)),
    onEditBridge: (bridge) => dispatch(editBridge(bridge)),
    onUpdateSurveyStatus: (status, surveyId) => dispatch(updateSurveyStatus(status, surveyId)),
    setLeftViewTab: tabName => dispatch(setSelectedTab(tabName)),

  });

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(TaskWizard);
