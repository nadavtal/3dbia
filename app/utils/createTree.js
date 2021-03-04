const createFolderTree = (paths) => {
    let parents = getParentsAndChildren(paths)
    // console.log(parents)
    return parents
  }

  const getParentsAndChildren = (paths) => {
    let parents = []
    // let elements = []
    paths.forEach(path => {
      if (path.length) {
        const parentName = path.split('/')[0]
        const child = path.replace(parentName + '/', '')
        // console.log(child)
        // console.log(child.length)
        const parent = parents.find(parent => parent.name == parentName)
        
        // if (!elements.includes(parentName)) {
        if (!parent) {
          // elements.push(parentName)
          parents.push({
            name: parentName,
            children: [child.length && child]
          })
        } else {
          
          parent.children.push(path.replace(parentName + '/', ''))
        }

      }
    });
    parents.forEach(parent => parent.children = getParentsAndChildren(parent.children))

    return parents
  }

export default createFolderTree;
