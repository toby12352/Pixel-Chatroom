import { useLocation, useNavigate, useParams } from 'react-router-dom';

function withRouter(Component){
    function ComponentwithRouterProp(props){
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();

        return(
            <Component
                {...props}
                location={location}
                params={params}
                navigate={navigate}
            />
        );

    }

    return ComponentwithRouterProp;
}

export default withRouter;