import "./css/HouseCard.module.css"


export const HouseCardComponent = ({house}) =>{
    return(
        <ul >
            <li >Ville: {house.city}</li>
            <li >Rue: {house.street}</li>
            <li>Prix location: ${house.rent}</li>
        </ul>
    )
}