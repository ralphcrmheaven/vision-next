import React, { FC, ReactNode } from 'react';


interface IProps {
  children: ReactNode,
	className: string
}

const  VCard: FC<IProps>  = ({children, ...others}) => {
	return (
		<>
			<div {...others} className={others.className}>
				{children}
			</div>
		</>
	)
}

export default VCard
