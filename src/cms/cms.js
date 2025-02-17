import CMS from 'decap-cms-app'

import AboutPagePreview from './preview-templates/AboutPagePreview'
import ProjectsPagePreview from './preview-templates/ProjectsPagePreview'
import ProjectPagePreview from './preview-templates/ProjectPagePreview'
import IndexPagePreview from './preview-templates/IndexPagePreview'


CMS.registerPreviewTemplate('index', IndexPagePreview)
CMS.registerPreviewTemplate('about', AboutPagePreview)
CMS.registerPreviewTemplate('projects', ProjectsPagePreview)
CMS.registerPreviewTemplate('project', ProjectPagePreview)
