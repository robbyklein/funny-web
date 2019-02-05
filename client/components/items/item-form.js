import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import ReactCrop from 'react-image-crop'

import { Field } from '../shared'
import {
    setItemTags,
    fetchItem,
    setItemPublished,
    setItemSource,
    setItemBlob,
    setItemCrop,
    setItemSrc,
    setItemCropImageUrl
} from '../../actions/items'
import { selectItem } from '../../reducers/items'

export class ItemForm extends Component {
    componentDidMount() {
        const { id, item, fetchItem } = this.props
        if (id && !item) fetchItem(id)
    }

    onSelectFile = e => {
        if (e.target.files && e.target.files.length > 0) {
            this.props.setItemSource(e.target.files[0])
            const reader = new FileReader()
            reader.addEventListener('load', () => this.props.setItemSrc(reader.result))
            reader.readAsDataURL(e.target.files[0])
        }
    }

    onImageLoaded = (image, pixelCrop) => {
        this.imageRef = image
    }

    onCropComplete = (crop, pixelCrop) => {
        this.makeClientCrop(crop, pixelCrop)
    }

    onCropChange = crop => {
        this.props.setItemCrop(crop)
    }

    async makeClientCrop(crop, pixelCrop) {
        if (this.imageRef && crop.width && crop.height) {
            const croppedImageUrl = await this.getCroppedImg(
                this.imageRef,
                pixelCrop,
                'newFile.jpeg'
            )
            
            this.props.setItemCropImageUrl(croppedImageUrl)
        }
    }

    getCroppedImg(image, pixelCrop, fileName) {
        const canvas = document.createElement('canvas')
        canvas.width = pixelCrop.width
        canvas.height = pixelCrop.height
        const ctx = canvas.getContext('2d')

        ctx.drawImage(
            image,
            pixelCrop.x,
            pixelCrop.y,
            pixelCrop.width,
            pixelCrop.height,
            0,
            0,
            pixelCrop.width,
            pixelCrop.height
        )

        return new Promise((resolve, reject) => {
            canvas.toBlob(blob => {
                this.props.setItemBlob(blob)

                if (!blob) {
                    console.error('Canvas is empty')
                    return
                }
                blob.name = fileName
                window.URL.revokeObjectURL(this.fileUrl)
                this.fileUrl = window.URL.createObjectURL(blob)
                resolve(this.fileUrl)
            }, 'image/jpeg')
        })
    }

    render() {
        const { tags, setItemTags, published, setItemPublished } = this.props
        const { crop, cropImageUrl, src } = this.props

        return (
            <Fragment>
                <Field
                    onChange={setItemTags}
                    value={tags}
                    type="text"
                    label="Tags (Comma separated)"
                    id="tags"
                />
                <Field
                    onChange={setItemPublished}
                    value={published}
                    type="checkbox"
                    label="Published"
                    id="published"
                />

                <input id="source" type="file" onChange={this.onSelectFile} />

                <div>
                    {src && (
                        <ReactCrop
                            src={src}
                            crop={crop}
                            onImageLoaded={this.onImageLoaded}
                            onComplete={this.onCropComplete}
                            onChange={this.onCropChange}
                        />
                    )}
                </div>
                {cropImageUrl && (
                    <img alt="Crop" style={{ maxWidth: '100%' }} src={cropImageUrl} />
                )}
            </Fragment>
        )
    }
}

function mapStateToProps({ items }, ownProps) {
    const { id } = ownProps.match.params

    return {
        id,
        item: selectItem(items, id),
        tags: items.tags,
        published: items.published,
        crop: items.crop, 
        cropImageUrl: items.cropImageUrl, 
        src: items.src
    }
}

export default withRouter(
    connect(
        mapStateToProps,
        {
            setItemTags,
            fetchItem,
            setItemPublished,
            setItemSource,
            setItemBlob,
            setItemCrop,
            setItemSrc,
            setItemCropImageUrl
        }
    )(ItemForm)
)
