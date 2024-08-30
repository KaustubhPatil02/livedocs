import React from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"


const UserTypesSelector = ({ userType, setUserType, onClickHandler }: UserTypeSelectorParams) => {

    const accessControlHandler = (type: UserType) => {
        setUserType(type)
        onClickHandler && onClickHandler(type)
    }

    return (
        // ai generated code, not sure if it's correct
        <Select value={userType} onValueChange={(type: UserType) => {
            accessControlHandler(type)
        }}>
            <SelectTrigger className="shad-select">
                <SelectValue  />
            </SelectTrigger>
            <SelectContent className='border-none bg-dark-200'>
                <SelectItem value="viewer" className='shad-select-item'>can view</SelectItem>
                <SelectItem value="editor" className='shad-select-item'>can edit</SelectItem>
                
                
            </SelectContent>
        </Select>

    )
}

export default UserTypesSelector