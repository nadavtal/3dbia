
export const createTableColumnsArray = (object, tableConfig) => {
    // console.log(tableConfig)
    let coloumns = []
    let header
    // tableConfig.fixedColumns.forEach(key => {
    //     // console.log(!editableFields.includes(key))
    //     header = capitalizeFirstLetter(key.replace("_", " "));
    //     coloumns.push({
    //         header: header,
    //         accessor: key,
    //         // isReadOnly: !editableFields.includes(key)
    //     });
    // })
    Object.keys(object).forEach(key => {
        header = capitalizeFirstLetter(key.replace("_", " "));
        // console.log(longFields)
        // console.log(longFields.includes(key), key)
        if (tableConfig.exludesFields && !tableConfig.exludesFields.includes(key)) {
            let column = {
              header: header,
              accessor: key,
              width: 150,
              align: "left"
            };
            // if (tableConfig.fixedColumns && tableConfig.fixedColumns.includes(key)) {
                
            // }
            if (tableConfig.wholeNumberFields && tableConfig.wholeNumberFields.includes(key)) {
                // console.log(key)
                column.format = 'n0'
                column.align = "center"
            }
            if (tableConfig.decimelNumberFields && tableConfig.decimelNumberFields.includes(key)) {
                column.format = 'n2'
                column.align = "center"
            }
            if (tableConfig.longFields && tableConfig.longFields.includes(key)) {
                column.width = 250
            }
            if (tableConfig.dateFields && tableConfig.dateFields.includes(key)) {
                column.align = "center"
            }
            
            coloumns.push(column);
        }
    })
    
    return coloumns
  }

export const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }