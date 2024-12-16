# frozen_string_literal: true

class PageConfigsController < ApplicationController
  def index
    @page_configs = PageConfig.all
    render json: @page_configs
  end

  def update
    page_config_data = page_config_params

    page_config_data.each do |page, components|
      # Convert the page key to an integer
      page_int = page.to_i
      page_config = PageConfig.find_or_initialize_by(page: page_int)

      # Ensure the components are in the correct format (array of strings)
      page_config.components = components.map { |component| component.to_s.downcase.tr(' ', '_') }

      next if page_config.save

      render json: { error: "Page #{page_int}: #{page_config.errors.full_messages.join(', ')}" },
             status: :unprocessable_entity
      return
    end

    render json: { message: 'Page configurations updated successfully' }, status: :ok
  rescue StandardError => e
    render json: { error: e.message }, status: :unprocessable_entity
  end

  private

  def page_config_params
    # Allow dynamic keys and convert them correctly
    params.require(:page_config).permit!.to_h.transform_values do |components|
      components.map { |component| component.to_s.downcase.tr(' ', '_') }
    end
  end
end
