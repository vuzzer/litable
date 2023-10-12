export const HouseCard = ({house}) =>{
    return(
        <ul key={house._id}>
            <li>{house.city}</li>
            <li>{house.street}</li>
            <li>{house.rent} $</li>
        </ul>
    )
}