import { getFileExtension, getFileNameByString, sortBy } from 'utils/dataUtils';

const createFolderTree = (paths, files) => {
    console.log('files', files)
    console.log('paths', paths)
    let depth = 0
    let parents = getParentsAndChildren(paths, files, depth)
    
    return parents
  }

  const getParentsAndChildren = (paths, files, depth, parent) => {
    // console.log('depth', depth)
    let parents = []
    // let elements = []
    paths.forEach(path => {
      if (path.length) {
        const parentName = path.split('/')[0]
        const child = path.replace(parentName + '/', '')
        // console.log(path)
        // console.log(child.length)
        const parentObj = parents.find(parent => parent.name == parentName)
        
        // if (!elements.includes(parentName)) {
        if (!parentObj) {
          const currentFolderPath = parent ?  parent + '/' + parentName : parentName
          parents.push({
            name: parentName,
            children: [child.length && child],
            path: currentFolderPath,
            files: files && getFileNameByString(currentFolderPath, files)
          })
        } else {
          
          parentObj.children.push(path.replace(parentName + '/', ''))
        }

      }
    });
    depth ++
    parents.forEach(parent => parent.children = getParentsAndChildren(parent.children, files, depth, parent.path))
    return parents
  }

export default createFolderTree;
